import express from "express";
import {
  storyCreateController,
  storyDeleteController,
  storyUpdateGenreController,
  storyUpdateTitleController,
} from "../../controllers/StoryData/StoryController";

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").get().post(storyCreateController);

storyRoute
  .route("/:storyId")
  .patch(storyUpdateTitleController)
  .delete(storyDeleteController);

storyRoute.route("/:storyId/genre").patch(storyUpdateGenreController);
