import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { cache } from "../cache/indexedDBCache";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetcher<T>(options: { url: string; config?: AxiosRequestConfig }): Promise<T> {
  const cacheKey = `${options.url}_${JSON.stringify(options.config || {})}`;

  if (!cache.isOnline()) {
    const cachedData = await cache.get<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    throw new Error("No internet connection and no cached data available");
  }

  try {
    const { data } = await axiosInstance.request({
      url: options.url,
      ...options.config,
    });

    await cache.set(cacheKey, data, 300000);
    return data;
  } catch (error) {
    const cachedData = await cache.get<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    throw error;
  }
}

interface UseCustomQueryOptions<TData, TError = Error>
  extends Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> {
  config?: AxiosRequestConfig;
}

function useCustomQuery<TData = unknown, TError = Error>(
  url: string,
  options?: UseCustomQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  const { config, ...queryOptions } = options || {};

  return useQuery<TData, TError>({
    queryKey: [url, config],
    queryFn: () => fetcher<TData>({ url, config }),
    ...queryOptions,
  });
}

export { useCustomQuery };
