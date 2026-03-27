import { Router } from "express";
import { createImageUpload } from "../../libs/storage";
import { handleSingleUpload } from "../../libs/uploadHandler";

const imageUpload = createImageUpload("livestream");

export const LivestreamRouter = Router();

LivestreamRouter.post(
  "/images",
  handleSingleUpload(imageUpload.single("images"))
);
