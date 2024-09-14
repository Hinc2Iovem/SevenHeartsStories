import express from "express";
import {
  createWaitController,
  deleteWaitController,
  getWaitByPlotFieldCommandIdController,
  updateWaitController,
  createWaitDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Wait/WaitController";

// Default route === /plotFieldCommands
export const waitRoute = express.Router();

waitRoute
  .route("/:plotFieldCommandId/wait")
  .get(getWaitByPlotFieldCommandIdController)
  .post(createWaitController);

waitRoute
  .route("/wait/topologyBlocks/:topologyBlockId/copy")
  .post(createWaitDuplicateController);

waitRoute
  .route("/wait/:waitId")
  .patch(updateWaitController)
  .delete(deleteWaitController);
