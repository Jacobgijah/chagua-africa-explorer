import qs from "qs";

type QueryObject = Record<string, unknown>;

export function buildStrapiQuery(query?: QueryObject) {
  if (!query) return "";
  const s = qs.stringify(query, { encodeValuesOnly: true });
  return s ? `?${s}` : "";
}
