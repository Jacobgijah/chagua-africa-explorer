// File: src/pages/Tours.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  X,
  RefreshCcw,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import toursHero from "@/assets/images/GalleryPreview/gallery12.jpg";

import { useTours } from "@/features/tours/hooks";
import type { TourAttributes } from "@/features/tours/api";
import { pickStrapiImageUrl } from "@/lib/strapi/media";
import { entityAttrs, type StrapiEntity } from "@/lib/strapi/types";

type UITour = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  gallery?: string[];
  duration: string;
  highlights: string[];
  rating: number;
  featured?: boolean;
  sortOrder?: number;
  quickFacts?: {
    duration?: string;
    difficulty?: string;
    groupSize?: string;
    bestSeason?: string;
  };
  publishedAt?: string;
};

const toStr = (v: unknown) => (v ?? "").toString();

const parseDays = (duration: string) => {
  const m = toStr(duration).match(/(\d+)\s*day/i);
  if (m?.[1]) return Number(m[1]);
  const n = Number(toStr(duration).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const cx = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

function normalizeHighlights(h: any): string[] {
  if (Array.isArray(h)) return h.map((x) => toStr(x)).filter(Boolean);
  return [];
}

function mapStrapiTourToUI(
  entity: StrapiEntity<TourAttributes>,
  fallbackImg: string
): UITour {
  const a = entityAttrs(entity) as any;
  const id = (entity as any).id ?? a.id ?? 0;

  const image = pickStrapiImageUrl(a.coverImage) || fallbackImg;

  const gallery = Array.isArray(a.gallery)
    ? (a.gallery
        .map((g: any) => pickStrapiImageUrl(g))
        .filter(Boolean) as string[])
    : undefined;

  const duration =
    toStr(a.durationLabel).trim() ||
    toStr(a?.quickFacts?.duration).trim() ||
    "";

  return {
    id,
    slug: toStr(a.slug),
    title: toStr(a.title),
    shortDescription: toStr(a.shortDescription),
    image,
    gallery,
    duration,
    highlights: normalizeHighlights(a.highlights),
    rating: Number.isFinite(Number(a.rating)) ? Number(a.rating) : 0,
    featured: Boolean(a.featured),
    sortOrder: Number.isFinite(Number(a.sortOrder)) ? Number(a.sortOrder) : undefined,
    quickFacts: a.quickFacts
      ? {
          duration: toStr(a.quickFacts.duration),
          difficulty: toStr(a.quickFacts.difficulty),
          groupSize: toStr(a.quickFacts.groupSize),
          bestSeason: toStr(a.quickFacts.bestSeason),
        }
      : undefined,
    publishedAt: toStr(a.publishedAt),
  };
}

const SkeletonCard = () => (
  <div
    className={[
      "group relative overflow-hidden rounded-3xl border border-border",
      "bg-white/60 backdrop-blur-xl",
      "shadow-[var(--shadow-soft)]",
    ].join(" ")}
  >
    <div className="h-[280px] w-full bg-muted animate-pulse" />
    <div className="p-5">
      <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
      <div className="mt-3 h-3 w-1/2 rounded bg-muted animate-pulse" />
      <div className="mt-6 h-3 w-5/6 rounded bg-muted animate-pulse" />
    </div>
  </div>
);

const Tours = () => {
  // Fetch ALL tours (client-side filter/sort for best UX parity with your design)
  const { data, isLoading, error, refetch, isFetching } = useTours({
    sort: "newest",
    page: 1,
    pageSize: 200,
  });

  const tours = useMemo(() => {
    const rows = (data?.data ?? []) as Array<StrapiEntity<TourAttributes>>;
    return rows.map((e) => mapStrapiTourToUI(e, toursHero));
  }, [data]);

  const totalCount = data?.meta?.pagination?.total ?? tours.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState<
    "all" | "short" | "medium" | "long"
  >("all");
  const [sortBy, setSortBy] = useState<"featured" | "duration" | "rating">(
    "featured"
  );

  const hasFilters =
    searchTerm.trim().length > 0 ||
    durationFilter !== "all" ||
    sortBy !== "featured";

  const filteredAndSortedTours = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    const filtered = tours.filter((tour) => {
      const title = tour.title?.toLowerCase() ?? "";
      const desc = tour.shortDescription?.toLowerCase() ?? "";
      const highlights = Array.isArray(tour.highlights) ? tour.highlights : [];

      const matchesSearch =
        !q ||
        title.includes(q) ||
        desc.includes(q) ||
        highlights.some((h) => (h || "").toLowerCase().includes(q));

      const days = parseDays(tour.duration);
      const matchesDuration =
        durationFilter === "all" ||
        (durationFilter === "short" && days > 0 && days <= 5) ||
        (durationFilter === "medium" && days >= 6 && days <= 8) ||
        (durationFilter === "long" && days >= 9);

      return matchesSearch && matchesDuration;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "duration":
          return parseDays(a.duration) - parseDays(b.duration);
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        default: {
          // Featured-first, then sortOrder asc, then publishedAt desc
          const fa = a.featured ? 1 : 0;
          const fb = b.featured ? 1 : 0;
          if (fb !== fa) return fb - fa;

          const soA = a.sortOrder ?? 9999;
          const soB = b.sortOrder ?? 9999;
          if (soA !== soB) return soA - soB;

          const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return tb - ta;
        }
      }
    });

    return filtered;
  }, [tours, searchTerm, durationFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={toursHero}
            alt="Tours hero"
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="container py-16 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                TANZANIA WONDERLAND TOURS
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
                Discover Tanzania’s wild majesty
              </h1>

              <p className="mt-4 max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed">
                Handcrafted safari experiences, mountain expeditions, cultural journeys, and island escapes —
                planned with local expertise and premium logistics.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)] transition-all"
                  asChild
                >
                  <Link to="/contact">
                    Plan Your Trip
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                  asChild
                >
                  <Link to="/gallery">Explore Gallery</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Badge className="rounded-full bg-white/10 text-white border border-white/15 backdrop-blur">
                  {isLoading ? "Loading…" : `${totalCount} Experiences`}
                </Badge>
                <Badge className="rounded-full bg-white/10 text-white border border-white/15 backdrop-blur">
                  Local Experts
                </Badge>
                <Badge className="rounded-full bg-white/10 text-white border border-white/15 backdrop-blur">
                  Tailor-made Planning
                </Badge>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="container pb-10">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[var(--shadow-soft)]">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Search */}
                  <div className="lg:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
                    <Input
                      placeholder="Search tours, destinations, activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-white/60 focus-visible:ring-primary/30"
                    />
                  </div>

                  {/* Duration */}
                  <Select
                    value={durationFilter}
                    onValueChange={(v) => setDurationFilter(v as any)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/15 text-white">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="short">1–5 Days</SelectItem>
                      <SelectItem value="medium">6–8 Days</SelectItem>
                      <SelectItem value="long">9+ Days</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                    <SelectTrigger className="bg-white/10 border-white/15 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {hasFilters && (
                    <div className="text-sm text-white/75">
                      Showing{" "}
                      <span className="font-semibold text-white">
                        {filteredAndSortedTours.length}
                      </span>{" "}
                      result(s)
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="h-10 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => refetch()}
                      disabled={isFetching}
                    >
                      <RefreshCcw className={cx("w-4 h-4 mr-2", isFetching && "animate-spin")} />
                      Refresh
                    </Button>

                    {hasFilters && (
                      <Button
                        variant="outline"
                        className="h-10 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                        onClick={() => {
                          setSearchTerm("");
                          setDurationFilter("all");
                          setSortBy("featured");
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear filters
                      </Button>
                    )}
                  </div>
                </div>

                {error ? (
                  <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-white/85">
                    <div className="font-semibold">Failed to load tours</div>
                    <div className="mt-1 text-sm text-white/70">{String(error)}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {isLoading ? "Loading…" : `${filteredAndSortedTours.length}`}{" "}
                {filteredAndSortedTours.length === 1 ? "Tour" : "Tours"} Found
              </h2>

              <Button variant="outline" size="sm" className="rounded-2xl">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredAndSortedTours.length === 0 ? (
              <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-10 text-center shadow-[var(--shadow-soft)]">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">No tours found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search criteria or clear your filters to browse all tours.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="h-12 rounded-2xl"
                    onClick={() => {
                      setSearchTerm("");
                      setDurationFilter("all");
                      setSortBy("featured");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedTours.map((tour, index) => (
                  <motion.article
                    key={tour.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.05, 0.35),
                    }}
                    className={[
                      "group relative overflow-hidden rounded-3xl border border-border",
                      "bg-white/60 backdrop-blur-xl",
                      "shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)]",
                      "transition-all duration-300 hover:-translate-y-1",
                    ].join(" ")}
                  >
                    <div className="relative">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.12),transparent_70%)]" />

                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        <Clock className="h-4 w-4 text-white/85" />
                        {tour.duration || "—"}
                      </div>

                      <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        {tour.rating ? tour.rating.toFixed(1) : "—"}
                      </div>

                      <div className="absolute inset-0 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10">
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <div className="text-xl font-semibold text-white">{tour.title}</div>
                          <div className="mt-2 line-clamp-2 text-sm text-white/75">
                            {tour.shortDescription}
                          </div>

                          {!!tour.highlights?.length && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tour.highlights.slice(0, 3).map((h) => (
                                <span
                                  key={h}
                                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur"
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-5 flex items-center justify-end">
                            <Button
                              className="h-11 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                              asChild
                            >
                              <Link to={`/tours/${tour.slug}`}>
                                View Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {tour.quickFacts?.groupSize ?? "Group sizes vary"}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Tanzania
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
                        <span>{tour.quickFacts?.difficulty ?? "—"}</span>
                        {tour.featured ? (
                          <Badge variant="secondary" className="rounded-full">
                            Featured
                          </Badge>
                        ) : null}
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden py-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
        </div>

        <div className="container">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-8 text-center shadow-[var(--shadow-soft)]">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Need a custom itinerary?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Tell us your dates, interests, and preferences. We’ll craft a tailor-made plan with clear logistics and
              fast responses.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)]"
                asChild
              >
                <Link to="/booking">Plan Custom Tour</Link>
              </Button>

              <Button variant="outline" className="h-12 rounded-2xl" asChild>
                <Link to="/contact">Speak with an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
