
export type Params = Promise<Record<string, string>>;
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export type NextPageProps = {
    params: Params,
    searchParams: SearchParams,
};

