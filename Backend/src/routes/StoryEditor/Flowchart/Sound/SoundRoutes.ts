import express from "express";
import {
  createSoundController,
  deleteSoundController,
  updateSoundController,
} from "../../../../controllers/StoryEditor/Flowchart/Sound/SoundController";

// Default route === /flowchartCommands
export const soundRoute = express.Router();

soundRoute.route("/:flowchartCommandId/sounds").post(createSoundController);
soundRoute.route("/sounds/:soundId").delete(deleteSoundController);

soundRoute
  .route("/sounds/:soundId/stories/:storyId")
  .patch(updateSoundController);
