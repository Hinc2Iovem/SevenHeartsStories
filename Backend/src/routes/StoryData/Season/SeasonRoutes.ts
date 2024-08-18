import express from "express";
import {
  seasonCreateController,
  seasonDeleteController,
  seasonsGetByStoryIdController,
} from "../../../controllers/StoryData/Season/SeasonController";

// Default route === /stories
export const seasonRoute = express.Router();

seasonRoute
  .route("/:storyId/seasons")
  .get(seasonsGetByStoryIdController)
  .post(seasonCreateController);

seasonRoute.route("/seasons/:seasonId").delete(seasonDeleteController);
