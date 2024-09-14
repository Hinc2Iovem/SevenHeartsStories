import express from "express";
import {
  createCommentController,
  createCommentDuplicateController,
  deleteCommentController,
  getCommentByPlotFieldCommandIdController,
  updateCommentController,
} from "../../../../controllers/StoryEditor/PlotField/Comment/CommentController";

// Default route === /plotFieldCommands
export const commentRoute = express.Router();

commentRoute
  .route("/:plotFieldCommandId/comments")
  .get(getCommentByPlotFieldCommandIdController)
  .post(createCommentController);

commentRoute
  .route("/comments/topologyBlocks/:topologyBlockId/copy")
  .post(createCommentDuplicateController);

commentRoute
  .route("/comments/:commentId")
  .patch(updateCommentController)
  .delete(deleteCommentController);
