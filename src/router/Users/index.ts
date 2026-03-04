import { Router } from "express";
import { createImageUpload, createVideoUpload } from "../../libs/storage";
import { handleSingleUpload, handleMultiUpload } from "../../libs/uploadHandler";

const imageUpload = createImageUpload("users");
const videoUpload = createVideoUpload("users");

export const UsersRouter = Router();

UsersRouter.post(
  "/images",
  handleSingleUpload(imageUpload.single("images"))
);

UsersRouter.post(
  "/videos",
  handleMultiUpload(videoUpload.array("videos"))
);
