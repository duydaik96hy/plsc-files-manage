import { Router } from "express";
import { createImageUpload } from "../../libs/storage";
import { handleSingleUpload } from "../../libs/uploadHandler";

const imageUpload = createImageUpload("attendance");

export const AttendanceRouter = Router();

AttendanceRouter.post(
  "/images",
  handleSingleUpload(imageUpload.single("images"))
);
