import { getCorsOriginWhitelist } from "./libs/env";

const corsOrigin = process?.env?.corsOrigin ?? "*";
const corsOriginWhitelist = getCorsOriginWhitelist(corsOrigin);

const wsOrigin =
  process?.env?.wsOrigin ?? process?.env?.corsOrigin ?? "http://localhost:8080";

export const serverConfig = {
  port: 3060,
  wsPort: 8000,
  debugLevel: process.env.output || "combined",
  jsonMaxSize: process.env.jsonMaxSize || "16mb",
  cwd: process.cwd(),
  corsOrigin,
  corsOriginWhitelist,
  wsOrigin,
};
