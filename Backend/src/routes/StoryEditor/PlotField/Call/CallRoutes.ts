import express from "express";
import {
  createCallController,
  deleteCallController,
  getCallByPlotFieldCommandIdController,
  updateCallController,
  updateCallReferencedCommandIndexController,
} from "../../../../controllers/StoryEditor/PlotField/Call/CallController";

// Default route === /plotFieldCommands
export const callRoute = express.Router();

callRoute
  .route("/:plotFieldCommandId/calls")
  .get(getCallByPlotFieldCommandIdController)
  .post(createCallController);

callRoute
  .route(
    "/calls/:callId/targetBlocks/:targetBlockId/sourceBlocks/:sourceBlockId"
  )
  .patch(updateCallController);

callRoute
  .route("/calls/:callId/commandIndex")
  .patch(updateCallReferencedCommandIndexController);

callRoute.route("/calls/:callId").delete(deleteCallController);
