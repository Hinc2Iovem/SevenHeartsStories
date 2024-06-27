import express from "express";
import {
  storyCreateController,
  storyDeleteController,
  storyUpdateGenreController,
  storyUpdateImgUrlController,
  storyUpdateTitleController,
} from "../../controllers/StoryData/StoryController";

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").post(storyCreateController);

storyRoute
  .route("/:storyId")
  .patch(storyUpdateTitleController)
  .delete(storyDeleteController);

storyRoute.route("/:storyId/img").patch(storyUpdateImgUrlController);

storyRoute.route("/:storyId/genre").patch(storyUpdateGenreController);
