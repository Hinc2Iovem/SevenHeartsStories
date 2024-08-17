import express from "express";
import {
  episodeAssignWorkersController,
  episodeGetByEpisodeIdAndStaffIdController,
  episodeGetByEpisodeIdController,
  episodeInfoUpdateStatusController,
} from "../../../controllers/StoryData/Episode/EpisodeInfoController";

// Default route === /episodeInfo
export const episodeInfoRoute = express.Router();

episodeInfoRoute
  .route("/episodes/:episodeId/staff/:staffId/status")
  .patch(episodeInfoUpdateStatusController);

episodeInfoRoute
  .route("/episodes/:episodeId")
  .get(episodeGetByEpisodeIdController);

episodeInfoRoute
  .route("/episodes/:episodeId/staff/:staffId")
  .patch(episodeAssignWorkersController)
  .get(episodeGetByEpisodeIdAndStaffIdController);
