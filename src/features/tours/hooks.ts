import { useQuery } from "@tanstack/react-query";
import { getTourBySlug, getTours } from "./api";

export function useTours(args: {
  search?: string;
  sort?: "newest" | "rating" | "title";
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["tours", args],
    queryFn: () => getTours(args),
    keepPreviousData: true,
  });
}

export function useTour(slug: string) {
  return useQuery({
    queryKey: ["tour", slug],
    queryFn: () => getTourBySlug(slug),
    enabled: Boolean(slug),
  });
}
