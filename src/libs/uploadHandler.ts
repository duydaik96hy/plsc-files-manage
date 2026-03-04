import { Request, Response, RequestHandler } from "express";
import dayjs from "dayjs";
import multer from "multer";
import { PostProcessFn } from "../types/upload";

/**
 * Build the date-prefixed filename that the API returns to the client.
 */
const datePrefixedName = (filename: string): string =>
  `${dayjs().format("YYYY-MM-DD")}/${filename}`;

/**
 * Create an Express route handler for single-file uploads.
 *
 * @param uploadMiddleware - multer.single() middleware
 * @param postProcess      - optional async callback invoked after the upload
 *                           succeeds (e.g. watermarking)
 */
export const handleSingleUpload = (
  uploadMiddleware: ReturnType<multer.Multer["single"]>,
  postProcess?: PostProcessFn
): RequestHandler => {
  return (req: Request, res: Response) => {
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.json({
          code: 2000,
          type: "single",
          file: null,
          msg: err instanceof Error ? err.message : String(err),
        });
      }

      if (!req.file) {
        return res.json({
          code: 2000,
          type: "single",
          file: null,
          msg: "No file uploaded or file type not accepted",
        });
      }

      try {
        res.json({
          code: 1000,
          type: "single",
          file: {
            ...req.file,
            filename: datePrefixedName(req.file.filename),
          },
          msg: "",
        });

        if (postProcess) {
          await postProcess(req.file.path, req.file);
        }
      } catch (error) {
        console.error("Single upload post-processing error:", error);
      }
    });
  };
};

/**
 * Create an Express route handler for multi-file uploads.
 *
 * @param uploadMiddleware - multer.array() middleware
 */
export const handleMultiUpload = (
  uploadMiddleware: ReturnType<multer.Multer["array"]>
): RequestHandler => {
  return (req: Request, res: Response) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return res.json({
          code: 2000,
          type: "multiple",
          fileList: [],
          msg: err instanceof Error ? err.message : String(err),
        });
      }

      const files = (req.files as Express.Multer.File[]) ?? [];

      if (files.length === 0) {
        return res.json({
          code: 2000,
          type: "multiple",
          fileList: [],
          msg: "No files uploaded",
        });
      }

      try {
        res.json({
          code: 1000,
          type: "multiple",
          fileList: files.map((f) => ({
            ...f,
            filename: datePrefixedName(f.filename),
          })),
          msg: "",
        });
      } catch (error) {
        console.error("Multi upload error:", error);
      }
    });
  };
};
