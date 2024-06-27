import express from "express";
import { getMusicController } from "../../controllers/StoryData/MusicController";

// Default route === /stories
export const musicRoute = express.Router();

musicRoute.route("/:storyId/music").get(getMusicController);
