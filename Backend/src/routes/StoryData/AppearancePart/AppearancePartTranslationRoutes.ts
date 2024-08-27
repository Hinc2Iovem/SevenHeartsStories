import express from "express";
import {
  createAppearancePartTranslationController,
  appearancePartUpdateTranslationController,
  appearancePartTranslationByAppearancePartIdController,
  getAllAppearancePartsTranslationByCharacterIdAndTypeController,
  getAllAppearancePartsTranslationByCharacterIdController,
  getAppearancePartTranslationUpdatedAtAndLanguageController,
} from "../../../controllers/StoryData/AppearancePart/AppearancePartTranslationController";

// Default route === /appearanceParts
export const appearancePartTranslationsRoute = express.Router();

appearancePartTranslationsRoute
  .route("/recent/translations")
  .get(getAppearancePartTranslationUpdatedAtAndLanguageController);

appearancePartTranslationsRoute
  .route("/:appearancePartId/translations")
  .get(appearancePartTranslationByAppearancePartIdController);

appearancePartTranslationsRoute
  .route("/:appearancePartId/characters/:characterId/translations")
  .patch(appearancePartUpdateTranslationController);

appearancePartTranslationsRoute
  .route("/characters/:characterId/translations")
  .post(createAppearancePartTranslationController)
  .get(getAllAppearancePartsTranslationByCharacterIdController);

appearancePartTranslationsRoute
  .route("/characters/:characterId/types/translations")
  .get(getAllAppearancePartsTranslationByCharacterIdAndTypeController);
