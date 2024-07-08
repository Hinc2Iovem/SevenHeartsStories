import express from "express";
import {
  appearancePartTranslationControllerUpdateNameType,
  characterCharacteristicTranslationUpdateController,
  characterTranslationUpdateController,
  episodeTranslationUpdateController,
  getTranslationAchievementController,
  getTranslationAppearancePartController,
  getTranslationCharacterCharacteristicController,
  getTranslationCharacterController,
  getTranslationChoiceController,
  getTranslationChoiceOptionController,
  getTranslationCommandWardrobeController,
  getTranslationEpisodeController,
  getTranslationGetItemController,
  getTranslationSayController,
  getTranslationSeasonController,
  getTranslationStoryController,
  getTranslationTextFieldNameController,
  seasonTranslationUpdateTitleController,
  storyTranslationUpdateController,
  updateAchievementTranslationController,
  updateChoiceOptionTranslationController,
  updateChoiceTranslationController,
  updateCommandWardrobeTranslationController,
  updateGetItemTranslationController,
  updateSayTranslationTextController,
} from "../../controllers/Additional/TranslationController";

// Default route === /translations
export const translationRoute = express.Router();

translationRoute
  .route("/textFieldNames")
  .get(getTranslationTextFieldNameController);

translationRoute
  .route("/appearanceParts/:appearancePartId")
  .patch(appearancePartTranslationControllerUpdateNameType)
  .get(getTranslationAppearancePartController);

translationRoute
  .route("/characters/:characterId")
  .patch(characterTranslationUpdateController)
  .get(getTranslationCharacterController);

translationRoute
  .route("/episodes/:episodeId")
  .patch(episodeTranslationUpdateController)
  .get(getTranslationEpisodeController);

translationRoute
  .route("/seasons/:seasonId")
  .patch(seasonTranslationUpdateTitleController)
  .get(getTranslationSeasonController);

translationRoute
  .route("/stories/:storyId")
  .patch(storyTranslationUpdateController)
  .get(getTranslationStoryController);

translationRoute
  .route("/characterCharacteristics/:characterCharacteristicId")
  .patch(characterCharacteristicTranslationUpdateController)
  .get(getTranslationCharacterCharacteristicController);

translationRoute
  .route("/plotFieldCommands/achievements/:achievementId")
  .patch(updateAchievementTranslationController)
  .get(getTranslationAchievementController);

translationRoute
  .route("/plotFieldCommands/choices/:choiceId")
  .patch(updateChoiceTranslationController)
  .get(getTranslationChoiceController);

translationRoute
  .route("/plotFieldCommands/choices/options/:choiceOptionId")
  .patch(updateChoiceOptionTranslationController)
  .get(getTranslationChoiceOptionController);

translationRoute
  .route("/plotFieldCommands/getItems/:getItemId")
  .patch(updateGetItemTranslationController)
  .get(getTranslationGetItemController);

translationRoute
  .route("/plotFieldCommands/say/:sayId")
  .patch(updateSayTranslationTextController)
  .get(getTranslationSayController);

translationRoute
  .route("/plotFieldCommands/wardrobes/:commandWardrobeId")
  .patch(updateCommandWardrobeTranslationController)
  .get(getTranslationCommandWardrobeController);
