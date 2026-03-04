import { NextFunction, Request, RequestHandler, Response } from "express";

export const uar = (): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
      return;
    }

    if (
      req.path === "/login" ||
      req.path.search("/register") !== -1 ||
      req.path === "/logout"
    ) {
      next();
      return;
    }

    // TODO: Implement JWT validation
    next();
  };
};
