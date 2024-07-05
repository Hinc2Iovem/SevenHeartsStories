import express from "express";
import {
  storyCreateController,
  storyDeleteController,
  storyGetAllByStatusController,
  storyGetAllController,
  storyUpdateImgUrlController,
} from "../../controllers/StoryData/StoryController";

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").get(storyGetAllController).post(storyCreateController);

storyRoute.route("/status").get(storyGetAllByStatusController);

storyRoute.route("/:storyId").delete(storyDeleteController);

storyRoute.route("/:storyId/img").patch(storyUpdateImgUrlController);
