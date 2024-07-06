import express from "express";
import {
  episodeCreateController,
  episodeDeleteController,
  episodeResetStatusController,
  episodesGetBySeasonIdController,
  episodeUpdateSeasonIdController,
  episodeGetByEpisodeIdController,
} from "../../controllers/StoryData/EpisodeController";

// Default route === /episodes
export const episodeRoute = express.Router();

episodeRoute
  .route("/:episodeId")
  .get(episodeGetByEpisodeIdController)
  .patch(episodeResetStatusController)
  .delete(episodeDeleteController);

episodeRoute
  .route("/seasons/:seasonId")
  .post(episodeCreateController)
  .get(episodesGetBySeasonIdController);

episodeRoute
  .route("/:episodeId/seasons/:newSeasonId")
  .patch(episodeUpdateSeasonIdController);
