// File: src/pages/TourDetails.tsx
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { Clock, Users, Calendar, TrendingUp, CheckCircle, XCircle, Star, Camera } from "lucide-react";

import toursHero from "@/assets/images/GalleryPreview/gallery12.jpg";

import { useTour } from "@/features/tours/hooks";
import type { TourAttributes } from "@/features/tours/api";
import { pickStrapiImageUrl } from "@/lib/strapi/media";
import { entityAttrs, type StrapiEntity } from "@/lib/strapi/types";

type TourExtra = { price?: string; reviews?: number };

const toStr = (v: unknown) => (v ?? "").toString();

const TourDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error, refetch } = useTour(slug || "");

  const entity = useMemo(() => {
    return (data?.data?.[0] ?? null) as StrapiEntity<TourAttributes> | null;
  }, [data]);

  const tour = useMemo(() => {
    return entity ? (entityAttrs(entity) as TourAttributes) : null;
  }, [entity]);

  const heroImage = useMemo(() => {
    return pickStrapiImageUrl((tour as any)?.coverImage) || toursHero;
  }, [tour]);

  const galleryUrls = useMemo(() => {
    const g: any[] = Array.isArray((tour as any)?.gallery) ? ((tour as any).gallery as any[]) : [];
    return g.map((x) => pickStrapiImageUrl(x)).filter(Boolean) as string[];
  }, [tour]);

  const durationLabel = useMemo(() => {
    return (
      toStr((tour as any)?.durationLabel).trim() ||
      toStr((tour as any)?.quickFacts?.duration).trim() ||
      "—"
    );
  }, [tour]);

  const rating = useMemo(() => {
    const r = Number((tour as any)?.rating);
    return Number.isFinite(r) ? r : null;
  }, [tour]);

  const extras = (tour as unknown as TourExtra) || {};
  const priceLabel = extras.price || "Request Quote";
  const reviews = extras.reviews;

  const itinerary = useMemo(() => {
    const list = Array.isArray((tour as any)?.itinerary) ? ((tour as any).itinerary as any[]) : [];
    return list
      .slice()
      .sort((a, b) => Number(a.day ?? 0) - Number(b.day ?? 0))
      .map((d) => ({
        id: d.id ?? `${d.day}-${d.title}`,
        day: Number(d.day ?? 0),
        title: toStr(d.title),
        description: toStr(d.description),
      }));
  }, [tour]);

  const inclusions = useMemo(() => {
    const list = Array.isArray((tour as any)?.inclusions) ? ((tour as any).inclusions as any[]) : [];
    return list.map((x) => toStr(x.text)).filter(Boolean);
  }, [tour]);

  const exclusions = useMemo(() => {
    const list = Array.isArray((tour as any)?.exclusions) ? ((tour as any).exclusions as any[]) : [];
    return list.map((x) => toStr(x.text)).filter(Boolean);
  }, [tour]);

  const highlights = useMemo(() => {
    const h = (tour as any)?.highlights;
    return Array.isArray(h) ? h.map((x: any) => toStr(x)).filter(Boolean) : [];
  }, [tour]);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Keep selectedImage aligned
  useMemo(() => {
    if (!selectedImage) setSelectedImage(heroImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroImage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="h-10 w-2/3 bg-muted rounded animate-pulse" />
          <div className="mt-4 h-5 w-1/2 bg-muted rounded animate-pulse" />
          <div className="mt-10 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 bg-muted rounded animate-pulse" />
              <div className="h-56 bg-muted rounded animate-pulse" />
              <div className="h-56 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-80 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-lg px-6">
          <h2 className="text-2xl font-bold text-foreground mb-3">Failed to load tour</h2>
          <p className="text-muted-foreground mb-6">{String(error)}</p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => refetch()}>Try Again</Button>
            <Button variant="outline" asChild>
              <Link to="/tours">View All Tours</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tour not found</h2>
          <p className="text-muted-foreground mb-6">The tour you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBookTour = () => {
    const bookingUrl = `/booking?tour=${encodeURIComponent(toStr((tour as any).title))}`;
    window.location.href = bookingUrl;
  };

  const quickFacts = (tour as any)?.quickFacts;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img src={heroImage} alt={toStr((tour as any).title)} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-chagua-orange text-black font-semibold">
                  <Clock className="w-4 h-4 mr-1" />
                  {durationLabel}
                </Badge>

                {rating !== null ? (
                  <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-chagua-orange fill-current mr-1" />
                    <span className="text-sm font-semibold text-black">{rating.toFixed(1)}</span>
                    {typeof reviews === "number" ? (
                      <span className="text-sm text-muted-foreground ml-1">({reviews})</span>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {toStr((tour as any).title)}
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {toStr((tour as any).shortDescription)}
              </p>

              {!!highlights.length && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {highlights.map((highlight, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Keep the same visual “price” placement, but CMS-driven fallback */}
              <div className="text-3xl font-bold text-chagua-orange">{priceLabel}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Facts */}
            {quickFacts ? (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Quick Facts</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Clock className="w-5 h-5 text-chagua-orange" />
                    <div>
                      <div className="font-semibold text-foreground">Duration</div>
                      <div className="text-muted-foreground">{toStr(quickFacts.duration)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <TrendingUp className="w-5 h-5 text-chagua-orange" />
                    <div>
                      <div className="font-semibold text-foreground">Difficulty</div>
                      <div className="text-muted-foreground">{toStr(quickFacts.difficulty)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Users className="w-5 h-5 text-chagua-orange" />
                    <div>
                      <div className="font-semibold text-foreground">Group Size</div>
                      <div className="text-muted-foreground">{toStr(quickFacts.groupSize)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-chagua-orange" />
                    <div>
                      <div className="font-semibold text-foreground">Best Season</div>
                      <div className="text-muted-foreground">{toStr(quickFacts.bestSeason)}</div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {/* Itinerary */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Day-by-Day Itinerary</h2>

              {itinerary.length ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {itinerary.map((day) => (
                    <AccordionItem
                      key={day.id}
                      value={`day-${day.day}-${day.id}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4">
                          <div className="bg-chagua-orange text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                            {day.day}
                          </div>
                          <span className="font-semibold text-left">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-6">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {day.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-lg border bg-muted p-6 text-muted-foreground">
                  Itinerary coming soon.
                </div>
              )}
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  What's Included
                </h3>
                {inclusions.length ? (
                  <ul className="space-y-3">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground">Not specified.</div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Not Included
                </h3>
                {exclusions.length ? (
                  <ul className="space-y-3">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground">Not specified.</div>
                )}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Gallery
              </h2>

              {galleryUrls.length ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryUrls.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square cursor-pointer group overflow-hidden rounded-lg"
                      onClick={() => {
                        setSelectedImage(image);
                        setIsGalleryOpen(true);
                      }}
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border bg-muted p-6 text-muted-foreground">
                  Gallery coming soon.
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="bg-muted p-6 rounded-lg border">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-chagua-orange mb-2">
                    {priceLabel}
                  </div>
                  <div className="text-muted-foreground">tailor-made pricing</div>
                </div>

                <Button
                  onClick={handleBookTour}
                  className="w-full bg-chagua-orange text-black hover:bg-chagua-orange/90 font-semibold text-lg py-6"
                >
                  Book This Tour
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">Free cancellation up to 48 hours</p>
                </div>

                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/tours">Back to Tours</Link>
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-muted p-6 rounded-lg border">
                <h3 className="font-bold text-lg text-foreground mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+255717395728"
                    className="flex items-center gap-3 text-muted-foreground hover:text-chagua-orange transition-colors"
                  >
                    <div className="w-10 h-10 bg-chagua-orange rounded-full flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm">+255 717 395 728</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/255717395728"
                    className="flex items-center gap-3 text-muted-foreground hover:text-chagua-orange transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="w-10 h-10 bg-chagua-orange rounded-full flex items-center justify-center">
                      💬
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm">Quick Response</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage || heroImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-chagua-orange text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
