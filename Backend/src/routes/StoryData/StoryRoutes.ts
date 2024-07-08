import express from "express";
import {
  storyCreateController,
  storyDeleteController,
  storyGetAllController,
  storyGetByIdController,
  storyUpdateImgUrlController,
  storyUpdateStatusController,
} from "../../controllers/StoryData/StoryController";
import paginatedQuery from "../../middlewares/paginatedQuery";
import Story from "../../models/StoryData/Story";

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").get(storyGetAllController).post(storyCreateController);

storyRoute.route("/status").get(paginatedQuery(Story), (req, res) => {
  res.json(res.locals.paginatedResults);
});

storyRoute
  .route("/:storyId")
  .get(storyGetByIdController)
  .delete(storyDeleteController);

storyRoute.route("/:storyId/img").patch(storyUpdateImgUrlController);

storyRoute.route("/:storyId/status").patch(storyUpdateStatusController);
