// File: src/components/ItineraryPreview.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MapPin, Clock, Camera, ArrowRight } from "lucide-react";

const sampleItinerary = [
  {
    day: 1,
    title: "Arrival in Arusha",
    description: "Welcome to Tanzania! Meet your guide and transfer to your accommodation.",
    highlights: ["Airport pickup", "Welcome briefing", "Overnight in Arusha"],
    icon: MapPin,
  },
  {
    day: 2,
    title: "Tarangire National Park",
    description: "Famous for its large elephant herds and ancient baobab trees.",
    highlights: ["Elephant encounters", "Baobab trees", "Bird watching"],
    icon: Camera,
  },
  {
    day: 3,
    title: "Serengeti National Park",
    description: "Enter the legendary Serengeti and witness the Great Migration.",
    highlights: ["Great Migration", "Big Five", "Endless plains"],
    icon: Camera,
  },
  {
    day: 4,
    title: "Central Serengeti",
    description: "Full day exploring the heart of the Serengeti ecosystem.",
    highlights: ["Predator sightings", "River crossings", "Sunset drive"],
    icon: Camera,
  },
  {
    day: 5,
    title: "Ngorongoro Crater",
    description: "Descend into the world's largest intact volcanic caldera.",
    highlights: ["Crater floor", "Dense wildlife", "Picnic lunch"],
    icon: MapPin,
  },
  {
    day: 6,
    title: "Cultural Experience & Departure",
    description: "Visit a Maasai village and transfer to the airport.",
    highlights: ["Maasai culture", "Traditional dance", "Departure"],
    icon: Clock,
  },
];

const ItineraryPreview = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  const header = useMemo(
    () => (
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-foreground/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          SAMPLE ITINERARY
        </div>

        <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          A refined look at a <span className="text-primary">6-day</span> Northern Circuit
        </h2>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          A high-level preview — expandable day-by-day. Built for the same premium, cinematic look as your Hero.
        </p>
      </div>
    ),
    []
  );

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      {/* Background consistent with Hero / Planner / Tours */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ background: "var(--pattern-khanga)" }}
        />
        <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
      </div>

      <div className="container">
        {header}

        <div className="mx-auto mt-12 max-w-5xl">
          {/* Accordion */}
          <div className="space-y-4">
            {sampleItinerary.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedDay === item.day;

              return (
                <div
                  key={item.day}
                  className={[
                    "group overflow-hidden rounded-3xl border border-border",
                    "bg-white/70 backdrop-blur-xl shadow-soft",
                    "transition-all duration-300",
                    "hover:shadow-glow",
                  ].join(" ")}
                >
                  {/* Header */}
                  <button
                    type="button"
                    onClick={() => toggleDay(item.day)}
                    className={[
                      "w-full text-left",
                      "px-5 py-5 sm:px-6 sm:py-6",
                      "transition-colors",
                      "hover:bg-muted/30",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                    ].join(" ")}
                    aria-expanded={isExpanded}
                    aria-controls={`itinerary-day-${item.day}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Icon tile (brand) */}
                        <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold text-foreground/80 backdrop-blur">
                              Day {item.day}
                            </span>
                            <span className="hidden sm:inline text-xs text-muted-foreground">
                              Northern Circuit preview
                            </span>
                          </div>

                          <h3 className="mt-2 text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                            {item.title}
                          </h3>

                          {/* Compact preview line */}
                          <p className="mt-2 line-clamp-2 max-w-3xl text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-white/70 backdrop-blur transition-all group-hover:bg-white">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Content */}
                  <div
                    id={`itinerary-day-${item.day}`}
                    className={[
                      "grid transition-all duration-300 ease-out",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                        <div className="mt-1 rounded-2xl border border-border bg-white/60 p-4 sm:p-5">
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.highlights.map((h) => (
                              <span
                                key={h}
                                className="rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-medium text-muted-foreground"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accent top line */}
                  <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>
              );
            })}
          </div>

          {/* CTA row */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl shadow-soft sm:flex-row">
            <div>
              <div className="text-sm font-semibold text-foreground">Want the full plan?</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Explore complete itineraries and tailor the trip to your dates and preferences.
              </div>
            </div>

            <Button
              className="group h-12 rounded-2xl bg-primary px-6 text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-glow transition-all"
              asChild
            >
              <Link to="/tours">
                See Full Itineraries
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPreview;
