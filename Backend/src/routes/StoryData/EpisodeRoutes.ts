import express from "express";
import {
  episodeCreateController,
  episodeDeleteController,
  episodeResetStatusController,
  episodesGetBySeasonIdController,
  episodeUpdateSeasonIdController,
} from "../../controllers/StoryData/EpisodeController";
import { episodeGetByEpisodeIdController } from "../../controllers/StoryData/EpisodeInfoController";

// Default route === /episodes
export const episodeRoute = express.Router();

episodeRoute
  .route("/stories/:storyId/seasons/:seasonId")
  .post(episodeCreateController);

episodeRoute
  .route("/:episodeId")
  .get(episodeGetByEpisodeIdController)
  .patch(episodeResetStatusController)
  .delete(episodeDeleteController);

episodeRoute.route("/seasons/:seasonId").get(episodesGetBySeasonIdController);

episodeRoute
  .route("/:episodeId/seasons/:newSeasonId")
  .patch(episodeUpdateSeasonIdController);
