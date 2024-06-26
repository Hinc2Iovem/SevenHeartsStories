import express from "express";
import {
  createCallController,
  deleteCallController,
  updateCallController,
  updateCallTargetBlockIdController,
} from "../../../../controllers/StoryEditor/PlotField/Call/CallController";

// Default route === /plotFieldCommands
export const callRoute = express.Router();

callRoute.route("/:plotFieldCommandId/calls").post(createCallController);

callRoute
  .route("/calls/:callId/targetBlocks/:targetBlockId")
  .patch(updateCallController);

callRoute
  .route("/calls/:callId/targetBlocks/:newTargetBlockId/assingNewBlock")
  .patch(updateCallTargetBlockIdController)
  .delete(deleteCallController);
callRoute.route("/calls/:callId/targetBlocks").delete(deleteCallController);
