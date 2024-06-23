import express from "express";
import {
  episodeCreateController,
  episodeDeleteController,
  episodeUpdateController,
  episodeUpdateSeasonIdController,
} from "../../controllers/StoryData/EpisodeController";

// Default route === /episodes
export const episodeRoute = express.Router();

episodeRoute.route("/").get().post(episodeCreateController);

episodeRoute
  .route("/:episodeId")
  .patch(episodeUpdateController)
  .delete(episodeDeleteController);

episodeRoute
  .route("/:episodeId/seasons/:newSeasonId")
  .patch(episodeUpdateSeasonIdController);
