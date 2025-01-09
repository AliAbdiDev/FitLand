import { useEffect, useState } from "react";

interface UseFetchProps {
    endpoint: string;
    token?: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    payload?: any;
    tokenIsavailable?: boolean;
    customErrorMessage?: string;
    dependencyOptional?: any;
}

export const API_Backend = 'https://postapi.liara.run';

const checkeEndPoint = (endpoint: string) => {
    // Endpoint should not start with slash and http.
    const regex = /^(\/|https?:\/\/)/;

    if (regex.test(endpoint)) {
        console.error(
            "FileName: apiHandler",
            "Endpoint should not start with slash(/) and http.",
            'Guide ====> The endpoint should be like this: (api/groups)'
        );
        return { ok: false, endpoint };
    }
    return { ok: true, endpoint };
};

interface UseFetchResult {
    data: Record<string, string | number> | Record<string, string | number>[];
    errorMessage: string | null;
    loading: boolean;
}


/**
 * Custom hook for making API calls (GET, POST, PUT, DELETE).
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.endpoint - The API endpoint.
 * @param {string} [params.token] - Optional authorization token.
 * @param {boolean} [params.tokenIsavailable=true] - Flag to indicate if token is available.
 * @param {string} [params.customErrorMessage] - Custom error message on failure.
 * @param {any} [params.dependencyOptional] - Optional dependency to trigger re-fetch.
 *
 * @returns {Object} - The response data, error message, and loading state.
 * @returns {any} data - The response data from the API or null if not yet loaded.
 * @returns {string|null} errorMessage - The error message if the request fails.
 * @returns {boolean} loading - The loading state of the request.
 *
 * @example
 * const { data, errorMessage, loading } = useApi({
 *   endpoint: 'some-endpoint',
 *   method: 'GET',
 *   token: 'your-token',
 * });
 * 
 * // The API Backend used by this hook:
 * const API_Backend = 'https://your-api-url.com';
 * console.log(`The API Backend is: ${API_Backend}`);
 * 
 * // This will log:
 * // The API Backend is: https://your-api-url.com
 */

export const useFetch = ({
    endpoint,
    token,
    method,
    payload,
    tokenIsavailable = true,
    customErrorMessage,
    dependencyOptional = null
}: UseFetchProps): UseFetchResult => {
    const [data, setData] = useState<any | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        const endpointResult = checkeEndPoint(endpoint);
        if (!endpointResult.ok) return;

        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch(`${API_Backend}/${endpointResult?.endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(tokenIsavailable && { Authorization: `Bearer ${token}` }),
                },
                ...(payload && { body: JSON.stringify(payload) })
            });

            if (!response.ok) {
                throw new Error(customErrorMessage || 'Error occurred, please try again');
            }

            const result = await response.json();
            setData(result);
        } catch (error: any) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint, token, dependencyOptional, method, payload]);

    return { data, errorMessage, loading };
};
