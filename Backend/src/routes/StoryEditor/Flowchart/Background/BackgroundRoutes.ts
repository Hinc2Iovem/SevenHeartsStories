import express from "express";
import {
  createBackgroundController,
  deleteBackgroundController,
  updateBackgroundController,
} from "../../../../controllers/StoryEditor/Flowchart/Background/BackgroundController";

// Default route === /flowchartCommands
export const backgroundRoute = express.Router();

backgroundRoute
  .route("/:flowchartCommandId/backgrounds")
  .post(createBackgroundController);

backgroundRoute
  .route("/backgrounds/:backgroundId")
  .patch(updateBackgroundController)
  .delete(deleteBackgroundController);
