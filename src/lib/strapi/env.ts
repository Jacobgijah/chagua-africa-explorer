export const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL || "").replace(/\/+$/, "");
export const STRAPI_TOKEN = (import.meta.env.VITE_API_TOKEN || "").trim();

export function assertStrapiUrl() {
  if (!STRAPI_URL) {
    throw new Error("Missing VITE_STRAPI_URL in your .env file");
  }
}
