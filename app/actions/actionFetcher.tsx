"use server";

import { cookieHandler } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

interface FetcherParams {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  sendToken?: boolean;
  customErrorMessage?: string;
}

interface FetcherResponse {
  error: string | null;
  response: Response | null;
  data: any;
}

export async function actionFetcher({
  url,
  method = "GET",
  headers = {},
  body,
  sendToken = true,
  customErrorMessage = "An error occurred",
}: FetcherParams): Promise<FetcherResponse> {
  const token = (await cookieHandler({})).getValue();
  console.log("🚀 ~ actionFetcher ~ token:", token);

  try {
    const fullUrl = `${BASE_URL}${url}`;
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(sendToken && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const finalHeaders = { ...defaultHeaders, ...headers };

    const options: RequestInit = {
      method,
      headers: finalHeaders,
      ...(body && { body: JSON.stringify(body) }),
    };

    const res = await fetch(fullUrl, options);

    let responseData = null;
    try {
      // Only parse JSON if response has content and is JSON
      if (res.headers.get("content-type")?.includes("application/json")) {
        responseData = await res.json();
      }
    } catch () {
    }

    if (!res.ok) {
      // Use API error message if available, otherwise fallback to custom message
      const errorMessage =
        responseData?.message || customErrorMessage || "An error occurred";
      return {
        error: errorMessage,
        response: res,
        data: responseData,
      };
    }

    return {
      error: null,
      response: res,
      data: responseData,
    };
  } catch (error: any) {
    return {
      error: customErrorMessage || error.message || "An unexpected error occurred",
      response: null,
      data: null,
    };
  }
}