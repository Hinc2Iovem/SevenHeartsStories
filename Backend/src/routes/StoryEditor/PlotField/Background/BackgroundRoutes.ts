import express from "express";
import {
  createBackgroundController,
  deleteBackgroundController,
  updateBackgroundController,
} from "../../../../controllers/StoryEditor/PlotField/Background/BackgroundController";

// Default route === /plotFieldCommands
export const backgroundRoute = express.Router();

backgroundRoute
  .route("/:plotFieldCommandId/backgrounds")
  .post(createBackgroundController);

backgroundRoute
  .route("/backgrounds/:backgroundId")
  .patch(updateBackgroundController)
  .delete(deleteBackgroundController);
