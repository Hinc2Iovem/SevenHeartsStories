import express from "express";
import {
  createBackgroundController,
  deleteBackgroundController,
  getBackgroundByPlotFieldCommandIdController,
  updateBackgroundController,
  updateBackgroundImgController,
} from "../../../../controllers/StoryEditor/PlotField/Background/BackgroundController";

// Default route === /plotFieldCommands
export const backgroundRoute = express.Router();

backgroundRoute
  .route("/:plotFieldCommandId/backgrounds")
  .post(createBackgroundController)
  .get(getBackgroundByPlotFieldCommandIdController);

backgroundRoute
  .route("/backgrounds/:backgroundId")
  .patch(updateBackgroundController)
  .delete(deleteBackgroundController);

backgroundRoute
  .route("/backgrounds/:backgroundId/img")
  .patch(updateBackgroundImgController);
