import { buildStrapiQuery } from "@/lib/strapi/query";
import { strapiGet } from "@/lib/strapi/http";
import type { StrapiCollectionResponse } from "@/lib/strapi/types";

export type MediaFile = {
  id: number;
  url: string;
  formats?: Record<string, { url: string }>;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

export type TourAttributes = {
  documentId?: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  durationLabel?: string | null;
  rating?: number | null;
  featured?: boolean | null;
  sortOrder?: number | null;

  coverImage?: MediaFile | null;
  gallery?: MediaFile[] | null;

  quickFacts?: {
    duration?: string | null;
    difficulty?: string | null;
    groupSize?: string | null;
    bestSeason?: string | null;
  } | null;

  inclusions?: Array<{ id: number; text: string }> | null;
  exclusions?: Array<{ id: number; text: string }> | null;

  itinerary?: Array<{
    id: number;
    day: number;
    title: string;
    description: string;
  }> | null;

  publishedAt?: string;
};

export function getTours(params?: {
  search?: string;
  sort?: "newest" | "rating" | "title";
  page?: number;
  pageSize?: number;
}) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 24;

  const sort =
    params?.sort === "rating"
      ? ["rating:desc", "publishedAt:desc"]
      : params?.sort === "title"
      ? ["title:asc"]
      : ["publishedAt:desc"];

  const q = buildStrapiQuery({
    sort,
    populate: "*", // simplest & matches your successful manual request
    filters: params?.search
      ? { title: { $containsi: params.search } }
      : undefined,
    pagination: { page, pageSize },
  });

  return strapiGet<StrapiCollectionResponse<TourAttributes>>(`/tours${q}`);
}

export function getTourBySlug(slug: string) {
  const q = buildStrapiQuery({
    populate: "*",
    filters: { slug: { $eq: slug } },
    pagination: { page: 1, pageSize: 1 },
  });

  return strapiGet<StrapiCollectionResponse<TourAttributes>>(`/tours${q}`);
}
