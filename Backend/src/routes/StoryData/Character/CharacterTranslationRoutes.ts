import express from "express";
import {
  characterCreateBlankController,
  characterCreateController,
  characterGetAllByLanguageAndStoryIdSearchController,
  characterUpdateTranslationController,
  getAllTranslationCharactersByStoryIdController,
  getCharacterTranslationByCharacterIdController,
  getPaginatedCharacterTranslationUpdatedAtAndLanguageController,
  getPaginatedTranlsationCharactersController,
} from "../../../controllers/StoryData/Character/CharacterTranslationController";

// Default route === /characters
export const characterTranslationRoute = express.Router();

characterTranslationRoute
  .route("/paginated/recent/translations")
  .get(getPaginatedCharacterTranslationUpdatedAtAndLanguageController);

characterTranslationRoute
  .route("/paginated/translations")
  .get(getPaginatedTranlsationCharactersController);

characterTranslationRoute
  .route("/stories/:storyId")
  .post(characterCreateController);

characterTranslationRoute
  .route("/stories/:storyId/blank")
  .post(characterCreateBlankController);

characterTranslationRoute
  .route("/stories/languages/search/translations")
  .get(characterGetAllByLanguageAndStoryIdSearchController);

characterTranslationRoute
  .route("/stories/:storyId/translations")
  .get(getAllTranslationCharactersByStoryIdController);

characterTranslationRoute
  .route("/:characterId/translations")
  .get(getCharacterTranslationByCharacterIdController)
  .patch(characterUpdateTranslationController);
