import { NextFunction, Request, Response } from "express";

export const cors = (
  req: Request,
  res: Response,
  next: NextFunction,
  corsOrigin = "*",
  whitelist: Array<string> | null = null
): void => {
  if (whitelist === null) {
    res.header("Access-Control-Allow-Origin", corsOrigin);
  } else if (whitelist.findIndex((x) => x === req.hostname) !== -1) {
    res.header("Access-Control-Allow-Origin", req.hostname);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept, Authorization, AuthUser,userName,accessToken"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");

  next();
};
