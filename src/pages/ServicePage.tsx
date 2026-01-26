// File: src/pages/ServicePage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";

// Local fallbacks (keep your design stable even if Strapi image is missing)
import heroImage from "@/assets/images/GalleryPreview/gallery9.jpg";

type StrapiMedia = {
  url?: string;
  formats?: Record<string, { url?: string }>;
};

type StrapiHighlight = {
  id?: number;
  text?: string;
};

type StrapiPackageLike = {
  id?: number;
  documentId?: string;

  // Tour-like fields (based on your sample)
  title?: string;
  slug?: string;
  durationLabel?: string;

  // If later you add real package fields (optional future-proof)
  name?: string;
  duration?: string;
  price?: string;
  priceLabel?: string;
  startingFrom?: string;
  startingPrice?: string;
};

type StrapiService = {
  id: number;
  documentId?: string;

  title?: string;
  slug?: string;
  tagline?: string;
  description?: string;

  highlights?: StrapiHighlight[];
  packages?: StrapiPackageLike[];

  // Your API uses bgImage (not "image")
  bgImage?: StrapiMedia;

  // In case you later rename to "image"
  image?: StrapiMedia;
};

function absUrl(base: string, maybeRelative?: string) {
  if (!maybeRelative) return "";
  if (maybeRelative.startsWith("http")) return maybeRelative;
  return `${base}${maybeRelative}`;
}

function pickBestImageUrl(media?: StrapiMedia) {
  if (!media) return "";
  // Prefer large/medium/small if available, else original
  const formats = media.formats || {};
  return (
    formats.large?.url ||
    formats.medium?.url ||
    formats.small?.url ||
    formats.thumbnail?.url ||
    media.url ||
    ""
  );
}

function normalizeService(raw: any): StrapiService | null {
  if (!raw) return null;

  // Strapi v5-like: fields are at root (your sample)
  if (typeof raw === "object" && raw.id && (raw.title || raw.slug)) {
    return raw as StrapiService;
  }

  // Strapi v4-like: { id, attributes: {...} }
  if (typeof raw === "object" && raw.id && raw.attributes) {
    const a = raw.attributes;
    const normalized: StrapiService = {
      id: raw.id,
      title: a.title,
      slug: a.slug,
      tagline: a.tagline,
      description: a.description,
      highlights: a.highlights,
      packages: a.packages,
      bgImage: a.bgImage?.data?.attributes
        ? { ...a.bgImage.data.attributes }
        : a.bgImage,
      image: a.image?.data?.attributes ? { ...a.image.data.attributes } : a.image,
    };
    return normalized;
  }

  return null;
}

function normalizePackages(packages: StrapiPackageLike[] | undefined) {
  const list = Array.isArray(packages) ? packages : [];
  return list.map((p) => {
    const name = p.name || p.title || "Itinerary";
    const duration = p.duration || p.durationLabel || "";
    const price =
      p.price ||
      p.priceLabel ||
      p.startingFrom ||
      p.startingPrice ||
      "Request a Quote";

    return {
      key: String(p.id ?? p.documentId ?? name),
      name,
      duration,
      price,
      slug: p.slug,
    };
  });
}

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const STRAPI_BASE =
    (import.meta as any).env?.VITE_STRAPI_URL?.replace(/\/+$/, "") ||
    "http://localhost:1337";

  const [service, setService] = useState<StrapiService | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      setService(null);

      try {
        // Fetch by slug (recommended for detail pages)
        const url = `${STRAPI_BASE}/api/services?filters[slug][$eq]=${encodeURIComponent(
          slug
        )}&populate=*`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`);
        }

        const json = await res.json();
        const first = Array.isArray(json?.data) ? json.data[0] : null;
        const normalized = normalizeService(first);

        setService(normalized);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [slug, STRAPI_BASE]);

  const heroSrc = useMemo(() => {
    const media = service?.bgImage || service?.image;
    const best = pickBestImageUrl(media);
    return best ? absUrl(STRAPI_BASE, best) : heroImage;
  }, [service, STRAPI_BASE]);

  const highlights = useMemo(() => {
    const list = Array.isArray(service?.highlights) ? service!.highlights! : [];
    return list
      .map((h) => (h?.text || "").trim())
      .filter(Boolean);
  }, [service]);

  const packages = useMemo(() => normalizePackages(service?.packages), [service]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={heroImage}
            alt="Loading"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="h-6 w-36 bg-white/20 rounded mb-4" />
              <div className="h-10 w-[min(720px,90%)] bg-white/20 rounded" />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="h-7 w-60 bg-muted rounded" />
              <div className="h-28 w-full bg-muted rounded" />
              <div className="h-7 w-44 bg-muted rounded" />
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-14 bg-muted rounded-lg" />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-xl border">
                <div className="h-6 w-40 bg-background/60 rounded mb-4" />
                <div className="h-10 w-full bg-background/60 rounded mb-3" />
                <div className="h-10 w-full bg-background/60 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-xl px-6">
          <h2 className="text-2xl font-bold mb-3">Failed to load service</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={heroSrc}
          alt={service.title || "Service"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge className="bg-primary text-primary-foreground mb-4">
              {service.title}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {service.tagline}
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                {service.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Package Itineraries</h2>

              {packages.length === 0 ? (
                <div className="bg-muted/40 border rounded-xl p-6 text-muted-foreground">
                  No itineraries have been linked to this service yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.key}
                      className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        {pkg.duration || "Custom duration"}
                      </p>
                      <p className="text-2xl font-bold text-primary mb-4">
                        {pkg.price}
                      </p>
                      <Link to="/contact">
                        <Button className="w-full">
                          Request Quote{" "}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-xl border sticky top-24">
              <h3 className="text-xl font-bold mb-4">Ready to Book?</h3>
              <p className="text-muted-foreground mb-6">
                Contact us for a personalized itinerary and quote.
              </p>
              <Link to="/contact">
                <Button className="w-full mb-4">Plan My Trip</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  Request a Quote
                </Button>
              </Link>
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" /> +255 717 395 728
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />{" "}
                  tanzaniawonderland@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
