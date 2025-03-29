export type ErrorResponse = {
    status?: 500|200|201|401|400|404|409,
    message?: string,
    details?: string | object | [],
    code?: string,
};