import express from "express";
import {
  createSoundController,
  deleteSoundController,
  updateSoundController,
} from "../../../../controllers/StoryEditor/PlotField/Sound/SoundController";

// Default route === /plotFieldCommands
export const soundRoute = express.Router();

soundRoute.route("/:plotFieldCommandId/sounds").post(createSoundController);
soundRoute.route("/sounds/:soundId").delete(deleteSoundController);

soundRoute
  .route("/sounds/:soundId/stories/:storyId")
  .patch(updateSoundController);
