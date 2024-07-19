import express from "express";
import {
  createBackgroundController,
  deleteBackgroundController,
  getBackgroundByPlotFieldCommandIdController,
  updateBackgroundController,
  updateBackgroundImgController,
  updateBackgroundMusicIdController,
} from "../../../../controllers/StoryEditor/PlotField/Background/BackgroundController";

// Default route === /plotFieldCommands
export const backgroundRoute = express.Router();

backgroundRoute
  .route("/:plotFieldCommandId/backgrounds")
  .post(createBackgroundController)
  .get(getBackgroundByPlotFieldCommandIdController);

backgroundRoute
  .route("/backgrounds/:backgroundId")
  .patch(updateBackgroundController);

backgroundRoute
  .route("/stories/:storyId/backgrounds/:backgroundId/musicName")
  .patch(updateBackgroundMusicIdController);

backgroundRoute
  .route("/backgrounds/:backgroundId/img")
  .patch(updateBackgroundImgController);
