import express from "express";
import {
  getMusicByIdController,
  getMusicController,
} from "../../controllers/StoryData/MusicController";

// Default route === /stories
export const musicRoute = express.Router();

musicRoute.route("/:storyId/music").get(getMusicController);

musicRoute.route("/:storyId/music/:musicId").get(getMusicByIdController);
