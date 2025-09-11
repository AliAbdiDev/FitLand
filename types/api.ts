export interface FetchProps {
    endpoint: string;
    token?: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    payload?: any;
    customErrorMessage?: string;
    options?: HeadersInit | null;
}

export interface FetchResult {
    data: any;
    errorMessage: string | null;
    response?: Response | null
    loading?: boolean;
}