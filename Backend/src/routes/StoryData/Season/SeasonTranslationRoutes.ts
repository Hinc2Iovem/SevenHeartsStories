import express from "express";
import {
  seasonCreateController,
  seasonGetByIdController,
  seasonTranslationUpdateController,
  getAllSeasonsTranslationsAndSearchController,
  getAllSeasonsTranslationsByStoryIdAndLanguageController,
  getPaginatedSeasonTranslationUpdatedAtAndLanguageController,
  getPaginatedTranlsationSeasonsController,
  getCheckSeasonTranslationCompletnessByStoryIdController,
} from "../../../controllers/StoryData/Season/SeasonTranslationController";
import { verifyHeadScriptwriter } from "../../../middlewares/verifyHeadScriptwriter";
import { verifyJWT } from "../../../middlewares/verifyJWT";

// Default route === /seasons
export const seasonTranslationRoute = express.Router();

seasonTranslationRoute
  .route("/paginated/recent/translations")
  .get(getPaginatedSeasonTranslationUpdatedAtAndLanguageController);

seasonTranslationRoute
  .route("/paginated/translations")
  .get(getPaginatedTranlsationSeasonsController);

seasonTranslationRoute
  .route("/stories/search/translations")
  .get(verifyJWT, getAllSeasonsTranslationsAndSearchController);

seasonTranslationRoute
  .route("/stories/:storyId/translations")
  .get(verifyJWT, getAllSeasonsTranslationsByStoryIdAndLanguageController)
  .post(verifyHeadScriptwriter, seasonCreateController);

seasonTranslationRoute
  .route("/:seasonId/translations")
  .get(verifyJWT, seasonGetByIdController)
  .patch(verifyJWT, seasonTranslationUpdateController);

seasonTranslationRoute
  .route("/stories/:storyId/completness/translations")
  .get(getCheckSeasonTranslationCompletnessByStoryIdController);
