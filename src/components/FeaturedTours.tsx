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
} from "lucide-react";

import serengetiImage from "@/assets/images/featuredTours/serengeti-migration.jpg";
import zanzibarImage from "@/assets/images/featuredTours/zanzibar-beach.jpg";
import kilimanjaroImage from "@/assets/images/featuredTours/kilimanjaro-trek.jpg";

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

const FeaturedTours = () => {
  // Autoplay interval (ms)
  const AUTO_MS = 1900;

  // How many clones on each side (1 is enough for your current layout)
  const CLONE = 1;

  const total = tours.length;

  // Build extended list: [last] + originals + [first]
  const slides = useMemo(() => {
    const head = tours.slice(-CLONE);
    const tail = tours.slice(0, CLONE);
    return [...head, ...tours, ...tail];
  }, [CLONE]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isResettingRef = useRef(false);

  // extActive = index in slides array
  const [extActive, setExtActive] = useState(CLONE); // start at first real slide
  const [active, setActive] = useState(0); // real index 0..total-1
  const [paused, setPaused] = useState(false);

  const extToReal = useCallback(
    (extIdx: number) => {
      // convert ext index -> real index
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
      const t = CLONE + realIdx; // shift into extended space
      setExtActive(t);
      setActive(realIdx);
      requestAnimationFrame(() => goToExt(t, behavior));
    },
    [CLONE, goToExt]
  );

  const wrapExtForButtons = useCallback(
    (idx: number) => {
      // valid ext indices: 0..(total + 2*CLONE - 1) == 0..(total+1) when CLONE=1
      const max = total + CLONE; // for CLONE=1 -> total+1 is last index
      if (idx < 0) return total; // jump near end (real last ext index)
      if (idx > max) return CLONE; // jump near start (first real ext index)
      return idx;
    },
    [CLONE, total]
  );

  const goPrev = useCallback(() => {
    const nextExt = wrapExtForButtons(extActive - 1);
    setExtActive(nextExt);
    setActive(extToReal(nextExt));
    requestAnimationFrame(() => goToExt(nextExt, "smooth"));
  }, [extActive, wrapExtForButtons, extToReal, goToExt]);

  const goNext = useCallback(() => {
    const nextExt = wrapExtForButtons(extActive + 1);
    setExtActive(nextExt);
    setActive(extToReal(nextExt));
    requestAnimationFrame(() => goToExt(nextExt, "smooth"));
  }, [extActive, wrapExtForButtons, extToReal, goToExt]);

  // Initial position: jump to first real slide (index = CLONE) without animation
  useEffect(() => {
    const el = scrollerRef.current;
    const item = itemRefs.current[CLONE];
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft, behavior: "auto" });
    // set states consistently
    setExtActive(CLONE);
    setActive(0);
  }, [CLONE]);

  // Track active slide & perform seamless reset at clones
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

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

        // update active state
        setExtActive(bestIdx);
        setActive(extToReal(bestIdx));

        if (isResettingRef.current) return;

        const lastExtIndex = total + CLONE; // for CLONE=1 -> total+1
        const firstRealExtIndex = CLONE; // 1
        const lastRealExtIndex = total; // total

        // If we reached clones, jump instantly to the corresponding real slide
        if (bestIdx === 0) {
          // at left clone (last item cloned)
          const jumpTo = lastRealExtIndex;
          const jumpItem = itemRefs.current[jumpTo];
          if (!jumpItem) return;

          isResettingRef.current = true;
          el.scrollTo({ left: jumpItem.offsetLeft, behavior: "auto" });
          setExtActive(jumpTo);
          setActive(extToReal(jumpTo));
          window.setTimeout(() => (isResettingRef.current = false), 30);
        } else if (bestIdx === lastExtIndex) {
          // at right clone (first item cloned)
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

  // Autoplay (infinite)
  useEffect(() => {
    if (paused) return;
    if (total <= 1) return;

    const id = window.setInterval(() => {
      // move to next slide (allow going into right clone; scroll handler will auto-reset)
      setExtActive((prev) => {
        const next = prev + 1;
        requestAnimationFrame(() => goToExt(next, "smooth"));
        return next;
      });
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [paused, total, AUTO_MS, goToExt]);

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

          {/* Arrows (always enabled for infinite loop) */}
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
              const href = `/tours/${slugify(tour.title)}`;

              return (
                <article
                  key={`${tour.id}-${idx}`} // important: unique keys for clones
                  ref={(node) => (itemRefs.current[idx] = node)}
                  className={[
                    "group relative flex-none snap-start",
                    "w-[90%] sm:w-[520px] lg:w-[520px] xl:w-[560px]",
                    "overflow-hidden rounded-3xl border border-border bg-white/60 backdrop-blur-xl",
                    "shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
                  ].join(" ")}
                >
                  {/* Image-first */}
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={`${tour.title} — image`}
                      className="h-[360px] sm:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      loading="lazy"
                    />

                    {/* Base readability gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    {/* Always-visible chips */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Clock className="h-4 w-4 text-white/85" />
                      {tour.duration}
                    </div>

                    <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      {tour.rating}
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
                      <span className="opacity-70">Hover for details</span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </article>
              );
            })}
          </div>

          {/* Dots (always for REAL tours only) */}
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
