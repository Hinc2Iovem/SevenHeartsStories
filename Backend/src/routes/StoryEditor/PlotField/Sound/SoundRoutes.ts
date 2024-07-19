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
  .get(getSoundByPlotFieldCommandIdController)
  .post(createSoundController);

soundCommandRoute
  .route("/stories/:storyId/commandSounds/:commandSoundId")
  .patch(updateSoundController);

soundCommandRoute
  .route("/sounds/:soundId/isGlobal")
  .patch(updateSoundIsGlobalController);

soundCommandRoute.route("/sounds/:soundId").delete(deleteSoundController);
