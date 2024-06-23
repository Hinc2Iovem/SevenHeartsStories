import express from "express";
import {
  episodeInfoUpdateController,
  episodeInfoUpdateStatusController,
} from "../../controllers/StoryData/EpisodeInfoController";

// Default route === /episodeInfo
export const episodeInfoRoute = express.Router();

episodeInfoRoute
  .route("/:episodeInfoId/status")
  .get()
  .patch(episodeInfoUpdateStatusController);

episodeInfoRoute
  .route("/:episodeInfoId/staff/:staffId")
  .patch(episodeInfoUpdateController);
