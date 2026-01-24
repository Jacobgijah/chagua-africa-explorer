import { STRAPI_URL } from "./env";

export function mediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Works for:
 * - Strapi v5 media object: { url, formats }
 * - Strapi v4 media relation: { data: { attributes: { url, formats } } }
 */
export function pickStrapiImageUrl(media: any) {
  if (!media) return null;

  // v4 shape
  const attrs = media?.data?.attributes;
  const formats = attrs?.formats;
  const baseUrl = attrs?.url;

  // v5 shape
  const v5Formats = media?.formats;
  const v5Url = media?.url;

  const f = formats || v5Formats;
  const u = baseUrl || v5Url;

  const preferred =
    f?.large?.url ||
    f?.medium?.url ||
    f?.small?.url ||
    f?.thumbnail?.url ||
    u;

  return mediaUrl(preferred || null);
}
