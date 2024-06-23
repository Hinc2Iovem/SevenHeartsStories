import express from "express";
import {
  createCallController,
  deleteCallController,
  updateCallController,
  updateCallTargetBlockIdController,
} from "../../../../controllers/StoryEditor/Flowchart/Call/CallController";

// Default route === /flowchartCommands
export const callRoute = express.Router();

callRoute.route("/:flowchartCommandId/calls").post(createCallController);

callRoute
  .route("/calls/:callId/targetBlocks/:targetBlockId")
  .patch(updateCallController);

callRoute
  .route("/calls/:callId/targetBlocks/:newTargetBlockId/assingNewBlock")
  .patch(updateCallTargetBlockIdController)
  .delete(deleteCallController);
callRoute.route("/calls/:callId/targetBlocks").delete(deleteCallController);
