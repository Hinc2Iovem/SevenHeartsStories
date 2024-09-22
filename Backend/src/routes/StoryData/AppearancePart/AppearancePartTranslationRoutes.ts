import express from "express";
import {
  createAppearancePartTranslationController,
  appearancePartUpdateTranslationController,
  appearancePartTranslationByAppearancePartIdController,
  getAllAppearancePartsTranslationByCharacterIdAndTypeController,
  getAllAppearancePartsTranslationByCharacterIdController,
  getPaginatedAppearancePartTranslationUpdatedAtAndLanguageController,
  getPaginatedTranlsationAppearancePartsController,
  getCheckAppearancePartTranslationCompletnessByCharacterIdController,
} from "../../../controllers/StoryData/AppearancePart/AppearancePartTranslationController";

// Default route === /appearanceParts
export const appearancePartTranslationsRoute = express.Router();

appearancePartTranslationsRoute
  .route("/paginated/recent/translations")
  .get(getPaginatedAppearancePartTranslationUpdatedAtAndLanguageController);

appearancePartTranslationsRoute
  .route("/paginated/translations")
  .get(getPaginatedTranlsationAppearancePartsController);

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

appearancePartTranslationsRoute
  .route("/characters/:characterId/completness/translations")
  .get(getCheckAppearancePartTranslationCompletnessByCharacterIdController);
