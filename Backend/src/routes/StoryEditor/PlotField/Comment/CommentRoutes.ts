import express from "express";
import {
  createCommentController,
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
  .route("/comments/:commentId")
  .patch(updateCommentController)
  .delete(deleteCommentController);
