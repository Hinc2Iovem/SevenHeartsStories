import express from "express";
import {
  createMoveController,
  deleteMoveController,
  updateMoveController,
} from "../../../../controllers/StoryEditor/PlotField/Move/MoveController";

// Default route === /plotFieldCommands
export const movesRoute = express.Router();

movesRoute.route("/:plotFieldCommandId/moves").post(createMoveController);
movesRoute
  .route("/moves/:moveId")
  .patch(updateMoveController)
  .delete(deleteMoveController);
