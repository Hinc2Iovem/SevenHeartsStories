import express from "express";
import {
  getAllSoundsController,
  getSoundByIdController,
  getSoundsByStoryIdController,
  getSoundsByStoryIdAndGlobalController,
} from "../../controllers/StoryData/SoundController";

// Default route === /stories
export const soundRoute = express.Router();

soundRoute.route("/sounds").get(getAllSoundsController);
soundRoute
  .route("/:storyId/sounds/isGlobal")
  .get(getSoundsByStoryIdAndGlobalController);

soundRoute.route("/:storyId/sounds").get(getSoundsByStoryIdController);

soundRoute.route("/sounds/:soundId").get(getSoundByIdController);
