export interface UploadResponse {
  code: number;
  type: "single" | "multiple";
  file?: Record<string, unknown>;
  fileList?: Record<string, unknown>[];
  msg: string;
}

export type PostProcessFn = (filePath: string, file: Express.Multer.File) => Promise<void>;
