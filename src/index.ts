import { json } from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { cors } from "./middlewares/cors";
import { uar } from "./middlewares/uar";
import { serverConfig } from "./serverConfig";
import http from "http";
import { UsersRouter } from "./router/Users";
import { TapsRouter } from "./router/Taps";
import { ProductsRouter } from "./router/Products";
import { AttendanceRouter } from "./router/Attendance";
import { LivestreamRouter } from "./router/Livestream";
import path from "path";

export const app = express();

app.use(json({ limit: serverConfig.jsonMaxSize }));
app.use((req, res, next) =>
  cors(
    req,
    res,
    next,
    serverConfig.corsOrigin,
    serverConfig.corsOriginWhitelist
  )
);

app.use(uar());

app.set("view engine", "html");

// Static content
app.use("/users", express.static(path.join(__dirname, "users")));
app.use("/taps", express.static(path.join(__dirname, "taps")));
app.use("/products", express.static(path.join(__dirname, "products")));
app.use("/attendance-photos", express.static(path.join(__dirname, "attendance")));
app.use("/livestream-photos", express.static(path.join(__dirname, "livestream")));

app.use("/swagger", express.static("swagger"), (_req, res) => {
  res.sendFile("./index.html", { root: serverConfig.cwd });
});

// API routes
app.use("/user", UsersRouter);
app.use("/tap", TapsRouter);
app.use("/product", ProductsRouter);
app.use("/attendance", AttendanceRouter);
app.use("/livestream", LivestreamRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ code: 5000, msg: "Internal server error" });
});

const server = http.createServer(app);

server.listen(serverConfig.port, () => {
  console.info("api-server started: ", {
    NODE_ENV: process.env.NODE_ENV,
    ...serverConfig,
  });
});
