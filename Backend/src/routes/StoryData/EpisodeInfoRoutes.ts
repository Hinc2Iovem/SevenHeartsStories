import express from "express";
import {
  episodeAssingWorkersController,
  episodeInfoUpdateStatusController,
} from "../../controllers/StoryData/EpisodeInfoController";

// Default route === /episodeInfo
export const episodeInfoRoute = express.Router();

episodeInfoRoute
  .route("/:episodes/staff/:staffId/status")
  .patch(episodeInfoUpdateStatusController);

episodeInfoRoute
  .route("/:episodes/staff/:staffId")
  .patch(episodeAssingWorkersController);
