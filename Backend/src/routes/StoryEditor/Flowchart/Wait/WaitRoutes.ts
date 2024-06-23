import express from "express";
import {
  createWaitController,
  deleteWaitController,
  updateWaitController,
} from "../../../../controllers/StoryEditor/Flowchart/Wait/WaitController";

// Default route === /flowchartCommands
export const waitRoute = express.Router();

waitRoute.route("/:flowchartCommandId/wait").post(createWaitController);
waitRoute
  .route("/wait/:waitId")
  .patch(updateWaitController)
  .delete(deleteWaitController);
