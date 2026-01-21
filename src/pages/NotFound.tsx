// File: src/pages/NotFound.tsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home, MapPin, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO (aligned to your premium hero system) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.10),transparent_70%)]" />
        </div>

        <div className="relative z-10">
          <div className="container py-16 sm:py-20">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                TANZANIA WONDERLAND
              </div>

              <div className="mt-8">
                <div className="text-[72px] sm:text-[96px] font-semibold leading-none tracking-tight text-white">
                  404
                </div>
                <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  This page isn’t on the map
                </h1>
                <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">
                  The route <span className="text-white font-semibold">{location.pathname}</span> doesn’t exist or may have moved.
                  Use the actions below to get back to planning your journey.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)] transition-all"
                  asChild
                >
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                  asChild
                >
                  <Link to="/tours">
                    <MapPin className="mr-2 h-4 w-4" />
                    Browse Tours
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                  asChild
                >
                  <Link to="/contact">
                    <Search className="mr-2 h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  Wildlife Safaris
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  Mountain Trekking
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  Cultural Tours
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                  Beach Escapes
                </span>
              </div>
            </div>
          </div>

          {/* “floating” panel into next section */}
          <div className="container pb-10">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-[var(--shadow-soft)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-white/85">
                    <div className="text-sm font-semibold tracking-wide">Quick navigation</div>
                    <div className="text-xs text-white/70">Most visited pages</div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur hover:bg-white/15 transition"
                    >
                      Home <ChevronRight className="h-4 w-4 opacity-80" />
                    </Link>

                    <Link
                      to="/tours"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur hover:bg-white/15 transition"
                    >
                      Tours <ChevronRight className="h-4 w-4 opacity-80" />
                    </Link>

                    <Link
                      to="/gallery"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur hover:bg-white/15 transition"
                    >
                      Gallery <ChevronRight className="h-4 w-4 opacity-80" />
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur hover:bg-white/15 transition"
                    >
                      Contact <ChevronRight className="h-4 w-4 opacity-80" />
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                If you believe this is an error, please contact support and share the route above.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
