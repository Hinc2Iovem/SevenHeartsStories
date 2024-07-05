import express from "express";
import {
  createSoundController,
  deleteSoundController,
  getSoundByPlotFieldCommandIdController,
  updateSoundController,
  updateSoundIsGlobalController,
} from "../../../../controllers/StoryEditor/PlotField/Sound/CommandSoundController";

// Default route === /plotFieldCommands
export const soundRoute = express.Router();

soundRoute
  .route("/:plotFieldCommandId/sounds")
  .get(getSoundByPlotFieldCommandIdController);

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
