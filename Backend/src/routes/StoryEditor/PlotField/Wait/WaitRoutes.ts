import express from "express";
import {
  createWaitController,
  deleteWaitController,
  updateWaitController,
} from "../../../../controllers/StoryEditor/PlotField/Wait/WaitController";

// Default route === /plotFieldCommands
export const waitRoute = express.Router();

waitRoute.route("/:plotFieldCommandId/wait").post(createWaitController);
waitRoute
  .route("/wait/:waitId")
  .patch(updateWaitController)
  .delete(deleteWaitController);
