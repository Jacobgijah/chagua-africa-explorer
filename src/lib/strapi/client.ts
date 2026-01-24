import axios from "axios";
import { assertStrapiUrl, STRAPI_TOKEN, STRAPI_URL } from "./env";

assertStrapiUrl();

export const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

strapiClient.interceptors.request.use((config) => {
  if (STRAPI_TOKEN) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }
  return config;
});
