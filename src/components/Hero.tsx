// File: src/components/Hero.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImage from "@/assets/images/hero/tanzania-hero.jpg";

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tanzania Wonderland - Experience Tanzania beyond imagination"
          className="h-full w-full object-cover motion-safe:animate-slow-zoom"
          loading="eager"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.14),transparent_70%)]" />

        {/* Soft brand glow */}
        <div className="absolute -top-28 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl opacity-60 motion-safe:animate-float" />
      </div>

      {/* Decorative corners + accents */}
      <div className="pointer-events-none absolute top-0 left-0 h-28 w-28 border-t-2 border-l-2 border-primary/25" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 border-b-2 border-r-2 border-primary/25" />
      <div className="pointer-events-none absolute top-1/4 left-10 h-2.5 w-2.5 rounded-full bg-primary/35 blur-[0.5px]" />
      <div className="pointer-events-none absolute bottom-1/3 right-16 h-6 w-6 rounded-full border border-primary/25 motion-safe:animate-[spin_14s_linear_infinite]" />

      {/* Content */}
      <div className="relative z-10">
        <div className="container min-h-[92vh] py-16 flex items-center">
          {/* Add real spacing between left and right */}
          <div className="grid w-full max-w-7xl mx-auto items-start gap-12 lg:grid-cols-12 lg:gap-20 xl:gap-24">
            {/* LEFT */}
            <div className="lg:col-span-7 lg:pr-12">
              {/* Tagline */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur-md shadow-soft motion-safe:animate-fade-up">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                LUXURY SAFARI • TREKS • CULTURE • BEACH
              </div>

              {/* Headline */}
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-[1.06] motion-safe:animate-fade-up [animation-delay:120ms]">
                Discover
                <span className="block mt-2 text-primary">Tanzania&apos;s</span>
                <span className="block mt-2 text-white/95">Wild Majesty</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed motion-safe:animate-fade-up [animation-delay:220ms]">
                Exclusive wildlife safaris, luxury mountain expeditions, and bespoke cultural journeys
                crafted for travelers seeking authentic African adventures with premium planning.
              </p>

              {/* Stats (cleaner + more premium) */}
              {/* <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 motion-safe:animate-fade-up [animation-delay:320ms]">
                {[
                  { top: "25+", bottom: "Years Experience" },
                  { top: "98%", bottom: "Satisfaction Rate" },
                  { top: "500+", bottom: "Expeditions" },
                  { top: "24/7", bottom: "Support" },
                ].map((s) => (
                  <div
                    key={s.bottom}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-center backdrop-blur-md"
                  >
                    <div className="text-2xl sm:text-3xl font-semibold text-white">
                      <span className="text-primary">{s.top}</span>
                    </div>
                    <div className="mt-1 text-[11px] sm:text-xs text-white/65 uppercase tracking-wider">
                      {s.bottom}
                    </div>
                  </div>
                ))}
              </div> */}

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 motion-safe:animate-slide-in [animation-delay:420ms]">
                <Link to="/contact">
                  <Button className="group h-12 sm:h-14 px-7 sm:px-9 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow border border-primary/40">
                    Begin Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link to="/gallery">
                  <Button
                    variant="outline"
                    className="group h-12 sm:h-14 px-7 sm:px-9 rounded-2xl border-white/35 bg-white/0 text-white hover:bg-white hover:text-secondary"
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Explore Adventures
                  </Button>
                </Link>
              </div>

              {/* Trust row */}
              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/75 motion-safe:animate-fade-up [animation-delay:520ms]">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  Licensed local operator
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  Private & small-group options
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  Tailor-made itineraries
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:block lg:col-span-5 lg:pl-12">
              {/* Subtle divider to emphasize spacing */}
              <div className="absolute hidden lg:block top-24 bottom-24 left-1/2 w-px bg-white/10" />

              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-glow p-6 sm:p-7 motion-safe:animate-fade-up [animation-delay:260ms]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-white/75">
                      Signature Experiences
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">
                      Choose your journey
                    </div>
                  </div>

                  <div className="hidden xl:block text-right">
                    <div className="text-xs text-white/70">Average response time</div>
                    <div className="text-sm font-semibold text-white">Within 24 hours</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/services/wildlife-safari"
                    className="group rounded-2xl border border-white/15 bg-white/10 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <div className="text-sm font-semibold text-white">Wildlife Safari</div>
                    <div className="mt-1 text-xs text-white/75">
                      Serengeti, Ngorongoro, Tarangire and more.
                    </div>
                    <div className="mt-3 text-xs font-semibold text-white/85">
                      Explore →{" "}
                      <span className="opacity-70 group-hover:opacity-100">Big Five routes</span>
                    </div>
                  </Link>

                  <Link
                    to="/services/mountain-trekking"
                    className="group rounded-2xl border border-white/15 bg-white/10 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <div className="text-sm font-semibold text-white">Mountain Trekking</div>
                    <div className="mt-1 text-xs text-white/75">
                      Kilimanjaro and highland adventures.
                    </div>
                    <div className="mt-3 text-xs font-semibold text-white/85">
                      Explore →{" "}
                      <span className="opacity-70 group-hover:opacity-100">Route planning</span>
                    </div>
                  </Link>

                  <Link
                    to="/services/cultural-tours"
                    className="group rounded-2xl border border-white/15 bg-white/10 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <div className="text-sm font-semibold text-white">Cultural Tours</div>
                    <div className="mt-1 text-xs text-white/75">
                      Local heritage, communities, authentic moments.
                    </div>
                    <div className="mt-3 text-xs font-semibold text-white/85">
                      Explore →{" "}
                      <span className="opacity-70 group-hover:opacity-100">Guided visits</span>
                    </div>
                  </Link>

                  <Link
                    to="/services/beach-escapes"
                    className="group rounded-2xl border border-white/15 bg-white/10 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <div className="text-sm font-semibold text-white">Beach Escapes</div>
                    <div className="mt-1 text-xs text-white/75">
                      Zanzibar, coastal stays, island relaxation.
                    </div>
                    <div className="mt-3 text-xs font-semibold text-white/85">
                      Explore →{" "}
                      <span className="opacity-70 group-hover:opacity-100">Resort picks</span>
                    </div>
                  </Link>
                </div>

                {/* Mini stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center">
                    <div className="text-lg font-semibold text-white">100%</div>
                    <div className="mt-1 text-[11px] text-white/70">Tailor-made</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center">
                    <div className="text-lg font-semibold text-white">Local</div>
                    <div className="mt-1 text-[11px] text-white/70">Experts</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center">
                    <div className="text-lg font-semibold text-white">24h</div>
                    <div className="mt-1 text-[11px] text-white/70">Support</div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/70">
                Premium planning with a conservation-minded approach.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
