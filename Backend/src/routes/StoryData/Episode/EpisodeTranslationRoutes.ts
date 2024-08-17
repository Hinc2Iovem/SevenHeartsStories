import express from "express";
import {
  episodeCreateController,
  episodeGetByIdController,
  episodeTranslationUpdateController,
  getAllEpisodesTranslationsBySeasonIdAndLanguageController,
  getAllEpisodesTranslationsByTypeAndSearchController,
} from "../../../controllers/StoryData/Episode/EpisodeTranslationController";
import { verifyHeadScriptwriter } from "../../../middlewares/verifyHeadScriptwriter";
import { verifyJWT } from "../../../middlewares/verifyJWT";

// Default route === /stories
export const episodeTranslationRoute = express.Router();

episodeTranslationRoute
  .route("/seasons/:seasonId/translations")
  .get(verifyJWT, getAllEpisodesTranslationsBySeasonIdAndLanguageController)
  .post(verifyHeadScriptwriter, episodeCreateController);

episodeTranslationRoute
  .route("/:episodeId/translations")
  .get(verifyJWT, episodeGetByIdController)
  .patch(verifyJWT, episodeTranslationUpdateController);

episodeTranslationRoute
  .route("/episodeStatus/search/translations")
  .get(verifyJWT, getAllEpisodesTranslationsByTypeAndSearchController);
