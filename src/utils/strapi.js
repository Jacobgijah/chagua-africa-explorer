// File: src/utils/strapi.js

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337")
  .replace(/\/$/, "");

// If you need a token, prefer server-only env var (no NEXT_PUBLIC).
// Keep content Public in Strapi if you fetch from the browser.
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

export const mediaUrl = (url = "") => {
  if (!url) return "";
  if (typeof url !== "string") return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

export const pickStrapiImageUrl = (image, preferred = ["large", "medium", "small", "thumbnail"]) => {
  const src =
    image?.data?.attributes ||
    image?.attributes ||
    image;

  const formats = src?.formats || {};
  for (const key of preferred) {
    const u = formats?.[key]?.url;
    if (u) return mediaUrl(u);
  }
  return mediaUrl(src?.url || "");
};

function toQueryString(queryObj = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(queryObj)) {
    if (v === undefined || v === null) continue;
    params.set(k, typeof v === "string" ? v : JSON.stringify(v));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export async function strapiFetch(path, options = {}) {
  const { query, headers, ...rest } = options;

  // allow either "/api/..." or "api/..."
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${STRAPI_URL}${normalizedPath}${toQueryString(query)}`;

  const res = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...(headers || {}),
    },
    cache: rest.cache ?? "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json();
}
