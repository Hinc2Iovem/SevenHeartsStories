import express from "express";
import {
  seasonCreateController,
  seasonDeleteController,
  seasonUpdateTitleController,
} from "../../controllers/StoryData/SeasonController";

// Default route === /seasons
export const seasonRoute = express.Router();

seasonRoute.route("/").get().post(seasonCreateController);

seasonRoute
  .route("/:seasonId")
  .patch(seasonUpdateTitleController)
  .delete(seasonDeleteController);
