import express from "express";
import {
  characterCreateBlankController,
  characterCreateController,
  characterDeleteController,
  characterGetAllByLanguageAndStoryIdSearchController,
  characterGetAllByStoryIdAndTypeController,
  characterGetAllByStoryIdController,
  characterGetByStoryIdAndNameController,
  characterUpdateController,
  characterUpdateImgController,
  characterUpdateTranslationController,
  getAllCharacterNameTagsController,
  getAllTranslationCharactersByStoryIdController,
  getCharacterTranslationByCharacterIdController,
  getSingleCharacterByIdController,
} from "../../controllers/StoryData/CharacterController";

// Default route === /characters
export const characterRoute = express.Router();

characterRoute
  .route("/stories/:storyId/nameTag")
  .get(getAllCharacterNameTagsController);
characterRoute
  .route("/stories/:storyId/name")
  .get(characterGetByStoryIdAndNameController);
characterRoute
  .route("/stories/:storyId")
  .get(characterGetAllByStoryIdController)
  .post(characterCreateController);

characterRoute
  .route("/stories/:storyId/blank")
  .post(characterCreateBlankController);

characterRoute
  .route("/stories/:storyId/type")
  .get(characterGetAllByStoryIdAndTypeController);

characterRoute.route("/:characterId/img").patch(characterUpdateImgController);

characterRoute
  .route("/:characterId")
  .get(getSingleCharacterByIdController)
  .patch(characterUpdateController)
  .delete(characterDeleteController);

characterRoute
  .route("/stories/languages/search/translations")
  .get(characterGetAllByLanguageAndStoryIdSearchController);

characterRoute
  .route("/stories/:storyId/translations")
  .get(getAllTranslationCharactersByStoryIdController);

characterRoute
  .route("/:characterId/translations")
  .get(getCharacterTranslationByCharacterIdController)
  .patch(characterUpdateTranslationController);
