import express from "express";
import {
  getAllStoriesTranslationsByTypeAndSearchController,
  getAllStoriesTranslationsByLanguageController,
  storyCreateController,
  storyGetByIdController,
  storyTranslationUpdateController,
} from "../../../controllers/StoryData/Story/StoryTranslationController";
import { verifyHeadScriptwriter } from "../../../middlewares/verifyHeadScriptwriter";
import { verifyJWT } from "../../../middlewares/verifyJWT";

// Default route === /stories
export const storyTranslationRoute = express.Router();

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
