import { Router } from "express";
import { createImageUpload, createVideoUpload } from "../../libs/storage";
import { handleSingleUpload, handleMultiUpload } from "../../libs/uploadHandler";

const keepOriginal = { keepOriginalName: true };

const imageUpload = createImageUpload("products", keepOriginal);
const videoUpload = createVideoUpload("products", keepOriginal);

export const ProductsRouter = Router();

ProductsRouter.post(
  "/images",
  handleSingleUpload(imageUpload.single("images"))
);

ProductsRouter.post(
  "/videos",
  handleMultiUpload(videoUpload.array("videos"))
);
