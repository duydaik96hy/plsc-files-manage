import { Router } from "express";
import path from "path";
import Sharp from "sharp";
import fs from "fs";
import { createImageUpload, createVideoUpload } from "../../libs/storage";
import { handleSingleUpload, handleMultiUpload } from "../../libs/uploadHandler";

const imageUpload = createImageUpload("taps");
const videoUpload = createVideoUpload("taps");

const WATERMARK_GRAVITIES = [
  "west", "north", "south", "east", "center",
  "northwest", "southeast", "northeast", "southwest",
] as const;

const logoPath = path.resolve(__dirname, "..", "..", "uploads", "logo.png");

/**
 * Post-process: apply a watermark at a random position.
 */
const applyWatermark = async (filePath: string): Promise<void> => {
  const gravity = WATERMARK_GRAVITIES[
    Math.floor(Math.random() * WATERMARK_GRAVITIES.length)
  ];

  const buffer = await Sharp(filePath)
    .composite([{ input: logoPath, gravity }])
    .toBuffer();

  await fs.promises.writeFile(filePath, buffer);
};

export const TapsRouter = Router();

TapsRouter.post(
  "/images",
  handleSingleUpload(imageUpload.single("images"), applyWatermark)
);

TapsRouter.post(
  "/videos",
  handleMultiUpload(videoUpload.array("videos"))
);
