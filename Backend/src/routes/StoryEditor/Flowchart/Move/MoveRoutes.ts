import express from "express";
import {
  createMoveController,
  deleteMoveController,
  updateMoveController,
} from "../../../../controllers/StoryEditor/Flowchart/Move/MoveController";

// Default route === /flowchartCommands
export const movesRoute = express.Router();

movesRoute.route("/:flowchartCommandId/moves").post(createMoveController);
movesRoute
  .route("/moves/:moveId")
  .patch(updateMoveController)
  .delete(deleteMoveController);
