import { FetchProps, FetchResult } from "@/types";
import { fetchHandler } from "@/utils";
import { useEffect, useState } from "react";

/**
 * Custom hook for making API calls (GET, POST, PUT, DELETE).
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.endpoint - The API endpoint.
 * @param {string} [params.token] - Optional authorization token.
 * @param {string} [params.method] - HTTP method (GET, POST, PUT, PATCH, DELETE).
 * @param {any} [params.payload] - Optional payload for POST, PUT, PATCH requests.
 * @param {string} [params.customErrorMessage] - Custom error message on failure.
 * @param {Record<string, string> | null} [params.options] - Optional headers.
 *
 * @returns {FetchResult} - The result data , response, error message, and loading state.
 */
export const useFetch = ({
    endpoint,
    method,
    payload,
    options = null,
    customErrorMessage,
}: FetchProps): FetchResult => {
    const [result, setResult] = useState<Pick<FetchResult, 'data' | 'response'>>({
        data: null,
        response: null,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetchHandler({ endpoint, method, payload, options, customErrorMessage })
            .then(({ response, data, errorMessage }) => {
                setResult({ data, response });
                setErrorMessage(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint, method, payload, options, customErrorMessage]);

    return { ...result, errorMessage, loading };
};