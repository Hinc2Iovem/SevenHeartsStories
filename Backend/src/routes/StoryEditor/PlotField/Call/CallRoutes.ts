import express from "express";
import {
  createCallController,
  deleteCallController,
  getCallByPlotFieldCommandIdController,
  updateCallController,
} from "../../../../controllers/StoryEditor/PlotField/Call/CallController";

// Default route === /plotFieldCommands
export const callRoute = express.Router();

callRoute
  .route("/:plotFieldCommandId/calls")
  .get(getCallByPlotFieldCommandIdController)
  .post(createCallController);

callRoute
  .route("/calls/:callId/targetBlocks/:targetBlockId")
  .patch(updateCallController);

callRoute.route("/calls/:callId").delete(deleteCallController);
