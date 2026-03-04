import multer from "multer";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { Base64 } from "js-base64";
import { v4 as uuid } from "uuid";

/**
 * Get the upload root directory for a given subdirectory (e.g. "users", "taps").
 * Resolves relative to the dist/ output directory (where __dirname points at runtime).
 */
const getUploadRoot = (subDir: string): string =>
  path.resolve(__dirname, "..", subDir);

/**
 * Create a multer disk storage engine that organises uploads into date-based
 * subdirectories (YYYY-MM-DD) under the given subDir.
 */
export interface StorageOptions {
  keepOriginalName?: boolean;
}

export const createStorage = (subDir: string, options: StorageOptions = {}): multer.StorageEngine =>
  multer.diskStorage({
    destination(_req, _file, cb) {
      const dir = path.join(getUploadRoot(subDir), dayjs().format("YYYY-MM-DD"));
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          console.error(`Failed to create upload directory: ${dir}`, err);
        }
        cb(null, dir);
      });
    },

    filename(req, file, cb) {
      if (options.keepOriginalName) {
        cb(null, file.originalname);
        return;
      }
      const username = String(req.headers.username ?? "unknown");
      const uid = uuid();
      const encoded = Base64.encode(file.originalname + uid);
      const ext = path.extname(file.originalname);
      cb(null, `${username}-${encoded}${Date.now()}${ext}`);
    },
  });

/**
 * Create a multer instance configured for image uploads (max 20 MB, image/* only).
 */
export const createImageUpload = (subDir: string, options: StorageOptions = {}): multer.Multer =>
  multer({
    storage: createStorage(subDir, options),
    limits: { fields: 12, fieldSize: 1024 * 1024 * 20 },
    fileFilter(_req, file, cb) {
      cb(null, file.mimetype.startsWith("image"));
    },
  });

/**
 * Create a multer instance configured for video uploads (max 200 MB).
 */
export const createVideoUpload = (subDir: string, options: StorageOptions = {}): multer.Multer =>
  multer({
    storage: createStorage(subDir, options),
    limits: { fields: 12, fieldSize: 1024 * 1024 * 200 },
  });
