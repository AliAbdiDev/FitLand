"use server";

import { cookieHandler } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/**
 * Parameters for the actionFetcher function
 */
interface FetcherParams {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  sendToken?: boolean;
  customErrorMessage?: string;
}

/**
 * Response structure from the fetcher
 */
interface FetcherResponse {
  error: string | null;
  response: Response;
  data: any;
}

/**
 * Common API fetcher function
 * @param params - Parameters for the fetch request
 * @returns Promise containing the fetch result with error, response, and data
 */
export async function actionFetcher({
  url,
  method = "GET",
  headers = {},
  body,
  sendToken = true,
  customErrorMessage = "An error occurred",
}: FetcherParams): Promise<FetcherResponse> {
  const token = (await cookieHandler({})).getValue();
  console.log(token);
  try {
    const fullUrl = `${BASE_URL}${url}`;
    // Set default headers
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
    const responseData = await res.json();

    if (!res.ok) {
      // In case of error, return custom error message along with response info and data
      return {
        error: customErrorMessage,
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
    // In case of exception, return custom error message or exception message
    return {
      error: customErrorMessage || error.message,
      response: null,
      data: null,
    };
  }
}
