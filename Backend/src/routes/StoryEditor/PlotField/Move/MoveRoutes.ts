import express from "express";
import {
  createMoveController,
  createMoveDuplicateController,
  deleteMoveController,
  getMoveByPlotFieldCommandIdController,
  updateMoveController,
} from "../../../../controllers/StoryEditor/PlotField/Move/MoveController";

// Default route === /plotFieldCommands
export const movesRoute = express.Router();

movesRoute
  .route("/:plotFieldCommandId/moves")
  .get(getMoveByPlotFieldCommandIdController)
  .post(createMoveController);

movesRoute
  .route("/moves/topologyBlocks/:topologyBlockId/copy")
  .post(createMoveDuplicateController);

movesRoute
  .route("/moves/:moveId")
  .patch(updateMoveController)
  .delete(deleteMoveController);
