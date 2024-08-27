import express from "express";
import {
  characteristicCreateController,
  characteristicGetByIdController,
  characteristicTranslationUpdateController,
  getAllCharacteristicsTranslationsByStoryIdAndLanguageController,
  getAllCharacteristicsTranslationsByCharacteristicIdAndLanguageController,
  getCharacteristicTranslationUpdatedAtAndLanguageController,
} from "../../../controllers/StoryData/Characteristic/CharacteristicTranslationController";
import { verifyHeadScriptwriter } from "../../../middlewares/verifyHeadScriptwriter";
import { verifyJWT } from "../../../middlewares/verifyJWT";

// Default route === /characteristics
export const characteristicTranslationRoute = express.Router();

characteristicTranslationRoute
  .route("/recent/translations")
  .get(verifyJWT, getCharacteristicTranslationUpdatedAtAndLanguageController);

characteristicTranslationRoute
  .route("/:characteristicId/translations")
  .get(
    verifyJWT,
    getAllCharacteristicsTranslationsByCharacteristicIdAndLanguageController
  );
characteristicTranslationRoute
  .route("/stories/:storyId/translations")
  .get(
    verifyJWT,
    getAllCharacteristicsTranslationsByStoryIdAndLanguageController
  )
  .post(verifyHeadScriptwriter, characteristicCreateController);

characteristicTranslationRoute
  .route("/:characteristicId/translations")
  .get(verifyJWT, characteristicGetByIdController);

characteristicTranslationRoute
  .route("/:characteristicId/stories/:storyId/translations")
  .patch(verifyJWT, characteristicTranslationUpdateController);
