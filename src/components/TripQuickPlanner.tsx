// File: src/components/TripQuickPlanner.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Baby, ArrowRight } from "lucide-react";
import TrustChips from "./TrustChips";

const TripQuickPlanner = () => {
  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-16">
      {/* Background: subtle safari texture + soft gradients (matches Hero) */}
      <div className="absolute inset-0 -z-10">
        {/* Base */}
        <div className="absolute inset-0 bg-background" />
        {/* Pattern (from index.css vars) */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ background: "var(--pattern-khanga)" }}
        />
        {/* Soft brand gradients */}
        <div className="absolute -top-32 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10rem] h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        {/* Gentle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-6xl">
          {/* Header strip (aligns with Hero styling) */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-foreground/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                QUICK TRIP PLANNER
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Plan your perfect adventure
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Get a personalized itinerary and free quote — fast, clear, and tailored.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-white/70 px-3 py-1.5 backdrop-blur">
                Local experts
              </span>
              <span className="rounded-full border border-border bg-white/70 px-3 py-1.5 backdrop-blur">
                Flexible dates
              </span>
              <span className="rounded-full border border-border bg-white/70 px-3 py-1.5 backdrop-blur">
                24/7 support
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white/75 backdrop-blur-xl shadow-glow">
            {/* Card accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="p-5 sm:p-7 lg:p-8">
              {/* Form grid */}
              <div className="grid gap-4 md:grid-cols-12 md:gap-4">
                {/* Arrival Date */}
                <div className="md:col-span-4">
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-foreground/80">
                    Arrival Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="date"
                      className="h-12 rounded-2xl pl-10 border border-border bg-white/80 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Adults */}
                <div className="md:col-span-3">
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-foreground/80">
                    Adults
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="number"
                      min={1}
                      defaultValue={2}
                      className="h-12 rounded-2xl pl-10 border border-border bg-white/80 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Children */}
                <div className="md:col-span-3">
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-foreground/80">
                    Children
                  </label>
                  <div className="relative">
                    <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="number"
                      min={0}
                      defaultValue={0}
                      className="h-12 rounded-2xl pl-10 border border-border bg-white/80 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-transparent select-none">
                    Action
                  </label>

                  <Link to="/contact" className="block">
                    <Button className="group w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-glow transition-all">
                      Get Free Quote
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Trust chips (kept) */}
              <TrustChips />
            </div>
          </div>

          {/* Optional micro-copy to connect to Hero */}
          <p className="mt-4 text-xs text-muted-foreground">
            Prefer a fully custom itinerary? Use “Get Free Quote” and tell us your style, budget, and travel dates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TripQuickPlanner;
