// File: src/components/FeaturedTours.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import serengetiImage from "@/assets/serengeti-migration.jpg";
import zanzibarImage from "@/assets/zanzibar-beach.jpg";
import kilimanjaroImage from "@/assets/kilimanjaro-sunrise.jpg";

const tours = [
  {
    id: 1,
    title: "Serengeti Migration Safari",
    image: serengetiImage,
    duration: "7 Days",
    highlights: ["Great Migration", "Big Five", "Balloon Safari"],
    price: "From $2,850",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    title: "Zanzibar Beach Paradise",
    image: zanzibarImage,
    duration: "5 Days",
    highlights: ["Pristine Beaches", "Spice Tours", "Stone Town"],
    price: "From $1,650",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    title: "Kilimanjaro Trekking",
    image: kilimanjaroImage,
    duration: "8 Days",
    highlights: ["Machame Route", "Summit Success", "Expert Guides"],
    price: "From $2,450",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    title: "Ngorongoro Crater Safari",
    image: serengetiImage,
    duration: "4 Days",
    highlights: ["Crater Floor", "Dense Wildlife", "Cultural Visit"],
    price: "From $1,950",
    rating: 4.7,
    reviews: 78,
  },
  {
    id: 5,
    title: "Northern Circuit Explorer",
    image: kilimanjaroImage,
    duration: "12 Days",
    highlights: ["Serengeti", "Ngorongoro", "Tarangire", "Manyara"],
    price: "From $4,200",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 6,
    title: "Cultural Heritage Tour",
    image: zanzibarImage,
    duration: "6 Days",
    highlights: ["Maasai Villages", "Local Markets", "Traditional Crafts"],
    price: "From $1,850",
    rating: 4.6,
    reviews: 67,
  },
];

const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const FeaturedTours = () => {
  // Standard autoplay interval (ms)
  const AUTO_MS = 1900;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const total = tours.length;

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const i = clamp(index, 0, total - 1);
      const el = scrollerRef.current;
      const item = itemRefs.current[i];
      if (!el || !item) return;

      el.scrollTo({ left: item.offsetLeft, behavior });
      setActive(i);
    },
    [total]
  );

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  // Determine active slide based on nearest card to the left edge
  const updateActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const left = el.scrollLeft;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < total; i++) {
      const item = itemRefs.current[i];
      if (!item) continue;
      const d = Math.abs(item.offsetLeft - left);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    setActive(bestIdx);
    updateArrows();
  }, [total, updateArrows]);

  // Scroll listener (throttled with rAF)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updateActiveFromScroll());
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);

    // initial
    updateArrows();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateActiveFromScroll, updateArrows]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    if (total <= 1) return;

    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % total;
        // scroll without waiting for state update
        requestAnimationFrame(() => goTo(next, "smooth"));
        return next;
      });
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [paused, total, goTo]);

  const scrollByAmount = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.88));
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

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
          Handpicked safari, trekking, culture and beach journeys — premium planning, local expertise,
          and reliable logistics.
        </p>
      </div>
    ),
    []
  );

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      {/* Background that matches your Hero */}
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

          {/* Arrows */}
          <div className="absolute -top-14 right-0 hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount("prev")}
              disabled={!canPrev}
              aria-label="Previous tours"
              className={[
                "h-10 w-10 rounded-2xl border backdrop-blur transition-all",
                "bg-white/70 border-border text-foreground hover:bg-white",
                !canPrev ? "opacity-40 cursor-not-allowed" : "hover:shadow-soft",
              ].join(" ")}
            >
              <ChevronLeft className="mx-auto h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount("next")}
              disabled={!canNext}
              aria-label="Next tours"
              className={[
                "h-10 w-10 rounded-2xl border backdrop-blur transition-all",
                "bg-white/70 border-border text-foreground hover:bg-white",
                !canNext ? "opacity-40 cursor-not-allowed" : "hover:shadow-soft",
              ].join(" ")}
            >
              <ChevronRight className="mx-auto h-5 w-5" />
            </button>
          </div>

          {/* Scroller (no scrollbar line) */}
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
            {tours.map((tour, idx) => {
              const href = `/tours/${slugify(tour.title)}`;

              return (
                <article
                  key={tour.id}
                  ref={(node) => (itemRefs.current[idx] = node)}
                  className={[
                    "group relative flex-none snap-start",
                    "w-[85%] sm:w-[440px] lg:w-[420px] xl:w-[440px]",
                    "overflow-hidden rounded-3xl border border-border bg-white/70 backdrop-blur-xl",
                    "shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
                  ].join(" ")}
                >
                  {/* Media */}
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.12),transparent_70%)]" />

                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Clock className="h-4 w-4 text-white/85" />
                      {tour.duration}
                    </div>

                    <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      {tour.rating}
                      <span className="text-white/70 font-medium">({tour.reviews})</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {tour.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {tour.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-medium text-muted-foreground"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xl font-semibold text-primary">{tour.price}</div>
                        <div className="text-xs text-muted-foreground">per person</div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">{tour.reviews} reviews</div>
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

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </article>
              );
            })}
          </div>

          {/* Dots (pagination) */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {tours.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i, "smooth")}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-all",
                    "border",
                    isActive
                      ? "bg-primary border-primary scale-110"
                      : "bg-white/60 border-border hover:bg-white",
                  ].join(" ")}
                />
              );
            })}
          </div>
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
