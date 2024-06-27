import express from "express";
import {
  createSoundController,
  deleteSoundController,
  updateSoundController,
  updateSoundIsGlobalController,
} from "../../../../controllers/StoryEditor/PlotField/Sound/SoundController";

// Default route === /plotFieldCommands
export const soundRoute = express.Router();

soundRoute
  .route("/:plotFieldCommandId/stories/:storyId/sounds")
  .post(createSoundController);
soundRoute
  .route("/stories/:storyId/sounds/:soundId")
  .patch(updateSoundController);

soundRoute
  .route("/sounds/:soundId/isGlobal")
  .patch(updateSoundIsGlobalController);
soundRoute.route("/sounds/:soundId").delete(deleteSoundController);
