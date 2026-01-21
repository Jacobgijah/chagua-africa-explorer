// File: src/pages/About.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Target,
  Eye,
  Leaf,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import abourHero from "@/assets/images/GalleryPreview/gallery13.jpg";

const About = () => {
  const values = [
    {
      title: "Local expertise",
      desc: "Guided by trusted Tanzanian specialists and reliable partners.",
      icon: Sparkles,
    },
    {
      title: "Safety & quality",
      desc: "Professional operations, clear logistics, and comfort-first planning.",
      icon: ShieldCheck,
    },
    {
      title: "Responsible travel",
      desc: "Conservation-minded choices that respect nature and communities.",
      icon: Leaf,
    },
    {
      title: "Authentic experiences",
      desc: "Meaningful culture, wildlife, trekking, and coastal journeys.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO (image background + your premium overlays) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Background image */}
          <img
            src={abourHero}
            alt="About Tanzania Wonderland"
            className="h-full w-full object-cover scale-105"
            loading="eager"
          />

          {/* Overlays for readability + match site theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.10),transparent_70%)]" />

          {/* Soft brand glow */}
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="container py-16 sm:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                ABOUT TANZANIA WONDERLAND
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
                Tanzania Wonderland Tours & Trekking
              </h1>

              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
                Welcome to Tanzania Wonderland — we craft wildlife safaris, mountain trekking, cultural tours,
                and beach escapes with local expertise and premium planning.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
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
                  <Link to="/tours">Explore Tours</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative isolate overflow-hidden py-14 sm:py-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-12rem] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.03]" />
        </div>

        <div className="container">
          <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-12">
            {/* Welcome / Intro */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-7 shadow-[var(--shadow-soft)]">
                <div className="text-sm font-semibold text-muted-foreground">Welcome message</div>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Experience Tanzania beyond imagination
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We are a Tanzania-based travel company dedicated to delivering classy, well-organized adventures.
                  From the Serengeti to Kilimanjaro and Zanzibar, we design journeys that feel effortless and memorable.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Wildlife Safari", "Cultural Tours", "Mountain Trekking", "Beach Escapes"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-semibold text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission / Vision */}
            <div className="lg:col-span-7 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-7 shadow-[var(--shadow-soft)]">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-border bg-white/60 p-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Mission</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      To craft safe, premium, and authentic Tanzania adventures—built on local expertise, clear
                      logistics, and exceptional service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-7 shadow-[var(--shadow-soft)]">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-border bg-white/60 p-3">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Vision</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      To be the trusted, modern Tanzania travel brand known for classy journeys, responsible tourism,
                      and unforgettable experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="md:col-span-2 rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-7 shadow-[var(--shadow-soft)]">
                <h3 className="text-lg font-semibold text-foreground">Core values</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {values.map((v) => {
                    const Icon = v.icon;
                    return (
                      <div key={v.title} className="flex items-start gap-3">
                        <div className="rounded-2xl border border-border bg-white/60 p-3">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{v.title}</div>
                          <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Simple CTA */}
          <div className="mt-10 flex justify-center">
            <Button
              className="h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-safari)] transition-all"
              asChild
            >
              <Link to="/contact">
                Request a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
