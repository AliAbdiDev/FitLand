import { FetchProps, FetchResult } from "@/types";

export const BASE_API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const disallowedHeaders = new Set(['Accept', 'Content-Type', 'Authorization']);
const mergeHeaders = ({ headers, options }: { headers: HeadersInit; options: HeadersInit | null }) => {
    if (!options || typeof options !== 'object') {
        console.error('Options is invalid or missing, no headers merged');
        return;
    }

    const filteredOptions = Object.fromEntries(
        Object.entries(options).filter(([key]) => !disallowedHeaders.has(key))
    );
    Object.assign(headers, filteredOptions);
};

const checkEndpoint = (endpoint: string): { endpoint: string | null; errorMessage?: string } => {
    const regex = /^https?:\/\//;
    if (regex.test(endpoint)) {
        return {
            endpoint: null,
            errorMessage: 'Endpoint should not start with http:// or https://. Example: api/groups'
        };
    }
    return { endpoint };
};

export const fetchHandler = async ({
    endpoint,
    method = 'GET',
    payload,
    token,
    options,
    customErrorMessage
}: FetchProps): Promise<FetchResult> => {
    
    const result: FetchResult = {
        response: null,
        data: null,
        errorMessage: null
    };

    const endpointResult = checkEndpoint(endpoint);
    if (!endpointResult.endpoint) {
        result.errorMessage = customErrorMessage || endpointResult.errorMessage || 'Invalid endpoint';
        return result;
    }

    const url = `${BASE_API}/${endpointResult.endpoint}`;
    const headers: HeadersInit = {
        ...(payload && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` })
    };

    mergeHeaders({ headers, options });

    try {
        const response = await fetch(url, {
            method,
            headers,
            ...(payload && { body: JSON.stringify(payload) })
        });

        result.response = response;

        if (!response.ok) {
            throw new Error(customErrorMessage || `HTTP error: ${response.status}`);
        }
        result.data = await response.json();

    } catch (error: any) {
        result.errorMessage = customErrorMessage || error.message || 'Something went wrong';
    }

    return result;
};
