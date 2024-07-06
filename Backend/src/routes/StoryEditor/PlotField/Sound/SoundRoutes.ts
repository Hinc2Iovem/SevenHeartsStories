import express from "express";
import {
  createSoundController,
  deleteSoundController,
  getSoundByPlotFieldCommandIdController,
  updateSoundController,
  updateSoundIsGlobalController,
} from "../../../../controllers/StoryEditor/PlotField/Sound/CommandSoundController";

// Default route === /plotFieldCommands
export const soundCommandRoute = express.Router();

soundCommandRoute
  .route("/:plotFieldCommandId/sounds")
  .get(getSoundByPlotFieldCommandIdController);

soundCommandRoute
  .route("/:plotFieldCommandId/stories/:storyId/sounds")
  .post(createSoundController);

soundCommandRoute
  .route("/stories/:storyId/sounds/:soundId")
  .patch(updateSoundController);

soundCommandRoute
  .route("/sounds/:soundId/isGlobal")
  .patch(updateSoundIsGlobalController);

soundCommandRoute.route("/sounds/:soundId").delete(deleteSoundController);
