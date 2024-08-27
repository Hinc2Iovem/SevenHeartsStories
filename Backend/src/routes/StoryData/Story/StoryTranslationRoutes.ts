import express from "express";
import {
  getAllAssignedStoriesTranslationsByLanguageAndStaffIdController,
  getAllStoriesTranslationsByLanguageController,
  getAllStoriesTranslationsByTypeAndSearchController,
  storyCreateController,
  storyGetByIdController,
  storyTranslationUpdateController,
  getStoryTranslationUpdatedAtAndLanguageController,
} from "../../../controllers/StoryData/Story/StoryTranslationController";
import { verifyHeadScriptwriter } from "../../../middlewares/verifyHeadScriptwriter";
import { verifyJWT } from "../../../middlewares/verifyJWT";

// Default route === /stories
export const storyTranslationRoute = express.Router();

storyTranslationRoute
  .route("/recent/translations")
  .get(getStoryTranslationUpdatedAtAndLanguageController);

storyTranslationRoute
  .route("/translations")
  .get(verifyJWT, getAllStoriesTranslationsByLanguageController)
  .post(verifyHeadScriptwriter, storyCreateController);

storyTranslationRoute
  .route("/:storyId/translations")
  .get(verifyJWT, storyGetByIdController)
  .patch(verifyJWT, storyTranslationUpdateController);

storyTranslationRoute
  .route("/storyStatus/search/translations")
  .get(verifyJWT, getAllStoriesTranslationsByTypeAndSearchController);

storyTranslationRoute
  .route("/staff/:staffId/search/translations")
  .get(
    verifyJWT,
    getAllAssignedStoriesTranslationsByLanguageAndStaffIdController
  );
