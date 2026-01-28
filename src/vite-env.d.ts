/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_URL: string;
  readonly VITE_API_TOKEN?: string; // optional if you use public endpoints
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
