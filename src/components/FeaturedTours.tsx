// File: src/components/FeaturedTours.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RefreshCcw,
} from "lucide-react";

import { useTours } from "@/features/tours/hooks";
import type { TourAttributes } from "@/features/tours/api";
import { pickStrapiImageUrl } from "@/lib/strapi/media";
import { entityAttrs, type StrapiEntity } from "@/lib/strapi/types";

import fallbackHero from "@/assets/images/GalleryPreview/gallery12.jpg";

type UITour = {
  id: number;
  slug: string;
  title: string;
  image: string;
  duration: string;
  highlights: string[];
  price: string;   // optional CMS field; fallback provided
  rating: number;
  reviews: number; // optional CMS field; fallback provided
};

const toStr = (v: unknown) => (v ?? "").toString();

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
  const slug = toStr(a.slug);
  const title = toStr(a.title);

  const image = pickStrapiImageUrl(a.coverImage) || fallbackImg;

  const duration =
    toStr(a.durationLabel).trim() ||
    toStr(a?.quickFacts?.duration).trim() ||
    "—";

  // Not in your payload sample; keep UI stable with safe defaults.
  const price = toStr((a as any).price).trim() || "Request Quote";
  const reviews = Number.isFinite(Number((a as any).reviews))
    ? Number((a as any).reviews)
    : 0;

  const rating = Number.isFinite(Number(a.rating)) ? Number(a.rating) : 0;

  return {
    id,
    slug,
    title,
    image,
    duration,
    highlights: normalizeHighlights(a.highlights),
    price,
    rating,
    reviews,
  };
}

const FeaturedTours = () => {
  // Autoplay interval (ms)
  const AUTO_MS = 1900;

  const { data, isLoading, isFetching, error, refetch } = useTours({
    sort: "newest",
    page: 1,
    pageSize: 200,
  });

  // Featured only
  const tours = useMemo(() => {
    const rows = (data?.data ?? []) as Array<StrapiEntity<TourAttributes>>;
    return rows
      .filter((e) => Boolean((entityAttrs(e) as any)?.featured))
      .map((e) => mapStrapiTourToUI(e, fallbackHero));
  }, [data]);

  const total = tours.length;

  // Clone strategy:
  // - 0 tours: show message (no carousel)
  // - 1 tour : no clones (render only once)
  // - 2+    : clone 1 on each side for infinite looping
  const CLONE = total > 1 ? 1 : 0;

  const slides = useMemo(() => {
    if (total === 0) return [];
    if (CLONE === 0) return tours;
    const head = tours.slice(-CLONE);
    const tail = tours.slice(0, CLONE);
    return [...head, ...tours, ...tail];
  }, [tours, total, CLONE]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isResettingRef = useRef(false);

  // extActive = index in slides
  const [extActive, setExtActive] = useState(0);
  const [active, setActive] = useState(0); // real index 0..total-1
  const [paused, setPaused] = useState(false);

  const extToReal = useCallback(
    (extIdx: number) => {
      if (total <= 0) return 0;
      if (CLONE === 0) return Math.max(0, Math.min(extIdx, total - 1));
      const real = (extIdx - CLONE + total) % total;
      return real < 0 ? real + total : real;
    },
    [CLONE, total]
  );

  const goToExt = useCallback((targetExt: number, behavior: ScrollBehavior = "smooth") => {
    const el = scrollerRef.current;
    const item = itemRefs.current[targetExt];
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft, behavior });
  }, []);

  const goToReal = useCallback(
    (realIdx: number, behavior: ScrollBehavior = "smooth") => {
      if (total <= 0) return;
      const t = CLONE === 0 ? realIdx : CLONE + realIdx;
      setExtActive(t);
      setActive(realIdx);
      requestAnimationFrame(() => goToExt(t, behavior));
    },
    [CLONE, goToExt, total]
  );

  const wrapExt = useCallback(
    (idx: number) => {
      if (total <= 0) return 0;

      // No clones: wrap between 0..total-1
      if (CLONE === 0) {
        if (idx < 0) return total - 1;
        if (idx > total - 1) return 0;
        return idx;
      }

      // With clones: valid ext indices are 0..(total + 2*CLONE - 1)
      const lastExtIndex = total + CLONE; // when CLONE=1 => total+1
      if (idx < 0) return total;      // jump near end (last real)
      if (idx > lastExtIndex) return CLONE; // jump near start (first real)
      return idx;
    },
    [CLONE, total]
  );

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    const nextExt = wrapExt(extActive - 1);
    setExtActive(nextExt);
    setActive(extToReal(nextExt));
    requestAnimationFrame(() => goToExt(nextExt, "smooth"));
  }, [total, wrapExt, extActive, extToReal, goToExt]);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    const nextExt = wrapExt(extActive + 1);
    setExtActive(nextExt);
    setActive(extToReal(nextExt));
    requestAnimationFrame(() => goToExt(nextExt, "smooth"));
  }, [total, wrapExt, extActive, extToReal, goToExt]);

  // Initial position (after data changes)
  useEffect(() => {
    if (total <= 0) return;

    const el = scrollerRef.current;
    const startExt = CLONE === 0 ? 0 : CLONE;
    const item = itemRefs.current[startExt];
    if (!el || !item) return;

    el.scrollTo({ left: item.offsetLeft, behavior: "auto" });
    setExtActive(startExt);
    setActive(0);
  }, [total, CLONE]);

  // Track active slide + seamless reset when clones are used
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (slides.length <= 0) return;

    let raf = 0;

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const left = el.scrollLeft;

        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < slides.length; i++) {
          const item = itemRefs.current[i];
          if (!item) continue;
          const d = Math.abs(item.offsetLeft - left);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        }

        setExtActive(bestIdx);
        setActive(extToReal(bestIdx));

        if (CLONE === 0) return; // no clone reset logic
        if (isResettingRef.current) return;

        const lastExtIndex = total + CLONE; // total+1 when CLONE=1
        const firstRealExtIndex = CLONE;    // 1
        const lastRealExtIndex = total;     // total

        // If we reached clones, jump instantly to corresponding real slide
        if (bestIdx === 0) {
          const jumpTo = lastRealExtIndex;
          const jumpItem = itemRefs.current[jumpTo];
          if (!jumpItem) return;

          isResettingRef.current = true;
          el.scrollTo({ left: jumpItem.offsetLeft, behavior: "auto" });
          setExtActive(jumpTo);
          setActive(extToReal(jumpTo));
          window.setTimeout(() => (isResettingRef.current = false), 30);
        } else if (bestIdx === lastExtIndex) {
          const jumpTo = firstRealExtIndex;
          const jumpItem = itemRefs.current[jumpTo];
          if (!jumpItem) return;

          isResettingRef.current = true;
          el.scrollTo({ left: jumpItem.offsetLeft, behavior: "auto" });
          setExtActive(jumpTo);
          setActive(extToReal(jumpTo));
          window.setTimeout(() => (isResettingRef.current = false), 30);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll as any);
    };
  }, [slides.length, total, CLONE, extToReal]);

  // Autoplay (infinite loop) — only when total > 1
  useEffect(() => {
    if (paused) return;
    if (total <= 1) return;

    const id = window.setInterval(() => {
      setExtActive((prev) => {
        const lastIdx = slides.length - 1;
        let next = prev + 1;

        // Prevent runaway index (this is what makes it "never stop")
        if (next > lastIdx) {
          next = CLONE === 0 ? 0 : CLONE;
        }

        requestAnimationFrame(() => goToExt(next, "smooth"));
        return next;
      });
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [paused, total, AUTO_MS, goToExt, slides.length, CLONE]);

  const header = useMemo(
    () => (
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-foreground/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          SIGNATURE EXPERIENCES
        </div>

        <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Featured tours crafted for <span className="text-primary">Tanzania Wonderland</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Images first — hover to reveal full details. Premium planning, local expertise, and reliable logistics.
        </p>
      </div>
    ),
    []
  );

  // Loading skeleton (kept simple)
  if (isLoading) {
    return (
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
        </div>

        <div className="container">
          {header}
          <div className="mx-auto mt-12 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-border bg-white/60 backdrop-blur-xl shadow-soft"
              >
                <div className="h-[360px] sm:h-[420px] bg-muted animate-pulse" />
                <div className="p-4">
                  <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                  <div className="mt-3 h-3 w-1/2 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
        </div>

        <div className="container">
          {header}
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-6 text-center shadow-soft">
            <div className="text-lg font-semibold text-foreground">
              Failed to load featured tours
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{String(error)}</div>
            <div className="mt-5 flex justify-center gap-3">
              <Button onClick={() => refetch()} disabled={isFetching}>
                <RefreshCcw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                Retry
              </Button>
              <Button variant="outline" asChild>
                <Link to="/tours">View All Tours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ✅ No featured tours: show message
  if (total === 0) {
    return (
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
        </div>

        <div className="container">
          {header}

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-8 text-center shadow-soft">
            <div className="text-xl font-semibold text-foreground">
              No featured tours available right now
            </div>
            <p className="mt-2 text-muted-foreground">
              Please check back soon, or browse all tours to explore available experiences.
            </p>

            <div className="mt-6 flex justify-center">
              <Button className="h-12 rounded-2xl" asChild>
                <Link to="/tours">
                  View All Tours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
      </div>

      <div className="container">
        {header}

        <div className="relative mx-auto mt-12 max-w-7xl">
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />

          {/* Arrows (only if 2+ tours) */}
          {total > 1 && (
            <div className="absolute -top-14 right-0 hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous tours"
                className="h-10 w-10 rounded-2xl border bg-white/70 border-border text-foreground hover:bg-white backdrop-blur transition-all hover:shadow-soft"
              >
                <ChevronLeft className="mx-auto h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next tours"
                className="h-10 w-10 rounded-2xl border bg-white/70 border-border text-foreground hover:bg-white backdrop-blur transition-all hover:shadow-soft"
              >
                <ChevronRight className="mx-auto h-5 w-5" />
              </button>
            </div>
          )}

          {/* Scroller */}
          <div
            ref={scrollerRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="no-scrollbar flex gap-7 overflow-x-auto scroll-smooth pb-2 pr-2 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" as any }}
            aria-label="Featured tours carousel"
          >
            {slides.map((tour, idx) => {
              const href = `/tours/${tour.slug}`;

              return (
                <article
                  key={`${tour.id}-${idx}`}
                  ref={(node) => (itemRefs.current[idx] = node)}
                  className={[
                    "group relative flex-none snap-start",
                    "w-[90%] sm:w-[520px] lg:w-[520px] xl:w-[560px]",
                    "overflow-hidden rounded-3xl border border-border bg-white/60 backdrop-blur-xl",
                    "shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
                  ].join(" ")}
                >
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={`${tour.title} — image`}
                      className="h-[360px] sm:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      loading="lazy"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    {/* Always-visible chips */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Clock className="h-4 w-4 text-white/85" />
                      {tour.duration}
                    </div>

                    <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      {tour.rating ? tour.rating.toFixed(1) : "—"}
                      <span className="text-white/70 font-medium">({tour.reviews})</span>
                    </div>

                    <div className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Maximize2 className="h-4 w-4 text-white/85" />
                      <span className="text-white/90">
                        {tour.duration} • {tour.price}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className={[
                        "absolute inset-0",
                        "opacity-0 translate-y-2",
                        "transition-all duration-300",
                        "group-hover:opacity-100 group-hover:translate-y-0",
                        "bg-gradient-to-t from-black/80 via-black/35 to-black/10",
                      ].join(" ")}
                    >
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                          {tour.title}
                        </h3>

                        {!!tour.highlights.length && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tour.highlights.map((h) => (
                              <span
                                key={`${h}-${idx}`}
                                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-5 flex items-end justify-between gap-4">
                          <div>
                            <div className="text-2xl font-semibold text-accent">{tour.price}</div>
                            <div className="text-xs text-white/70">per person</div>
                          </div>
                          <div className="text-right text-xs text-white/70">
                            {tour.reviews} reviews
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            className="group/button w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-glow transition-all"
                            asChild
                          >
                            <Link to={href}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">{tour.title}</span>
                      <span className="opacity-70">{total > 1 ? "Hover for details" : "Featured tour"}</span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </article>
              );
            })}
          </div>

          {/* Dots (only if 2+ tours) */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {tours.map((t, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goToReal(i, "smooth")}
                    className={[
                      "h-2.5 w-2.5 rounded-full transition-all border",
                      isActive
                        ? "bg-primary border-primary scale-110"
                        : "bg-white/60 border-border hover:bg-white",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            className="h-12 rounded-2xl border-border bg-white/70 px-7 text-foreground hover:bg-white hover:text-secondary backdrop-blur"
            asChild
          >
            <Link to="/tours">
              View All Tours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
