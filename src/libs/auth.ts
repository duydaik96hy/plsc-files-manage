import { Request } from "express";

/**
 * (1) Try to retrieve the token from Header
 * (2) Try to retrieve the token from params
 * @param req
 */
export const getAuthToken = (req: Request): string => {
    const authorization = req.headers?.accesstoken?.toString() ?? (req.query.token as string) ?? "";
    const authToken = authorization.replace("Bearer ", "");

    return authToken;
};
