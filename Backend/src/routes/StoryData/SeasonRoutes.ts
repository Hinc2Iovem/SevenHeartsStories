import express from "express";
import {
  seasonCreateController,
  seasonDeleteController,
  seasonUpdateTitleController,
} from "../../controllers/StoryData/SeasonController";

// Default route === /stories
export const seasonRoute = express.Router();

seasonRoute.route("/:storyId/seasons").post(seasonCreateController);

seasonRoute
  .route("/seasons/:seasonId")
  .patch(seasonUpdateTitleController)
  .delete(seasonDeleteController);
