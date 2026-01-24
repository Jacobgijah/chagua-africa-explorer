import type { AxiosRequestConfig } from "axios";
import { strapiClient } from "./client";

export async function strapiGet<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const res = await strapiClient.get<T>(path, config);
    return res.data;
  } catch (err: any) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Strapi request failed";
    throw new Error(status ? `(${status}) ${msg}` : msg);
  }
}
