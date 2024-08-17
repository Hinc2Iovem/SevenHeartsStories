import express from "express";
import {
  episodeDeleteController,
  episodeResetStatusController,
  episodesGetBySeasonIdController,
  episodeUpdateSeasonIdController,
  episodeGetByEpisodeIdController,
  episodeUpdateOrderController,
} from "../../../controllers/StoryData/Episode/EpisodeController";
// Default route === /episodes
export const episodeRoute = express.Router();

episodeRoute
  .route("/:episodeId")
  .get(episodeGetByEpisodeIdController)
  .patch(episodeResetStatusController)
  .delete(episodeDeleteController);

episodeRoute.route("/seasons/:seasonId").get(episodesGetBySeasonIdController);

episodeRoute.route("/:episodeId/newOrder").patch(episodeUpdateOrderController);

episodeRoute
  .route("/:episodeId/seasons/:newSeasonId")
  .patch(episodeUpdateSeasonIdController);
