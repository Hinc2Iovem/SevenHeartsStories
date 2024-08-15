import express from "express";
import {
  appearancePartTranslationControllerUpdateNameType,
  characterCharacteristicTranslationUpdateController,
  characterTranslationUpdateController,
  episodeTranslationUpdateController,
  getSingleTranslationChoiceOptionController,
  getTranslationAchievementByPlotFieldCommandIdController,
  getTranslationAchievementController,
  getTranslationAppearancePartController,
  getTranslationByCommandIdController,
  getTranslationCharacterCharacteristicController,
  getTranslationCharacterController,
  getTranslationChoiceByPlotFieldCommandIdController,
  getTranslationChoiceController,
  getTranslationChoiceOptionController,
  getTranslationCommandWardrobeByPlotFieldCommandIdController,
  getTranslationCommandWardrobeController,
  getTranslationEpisodeController,
  getTranslationGetItemByPlotFieldCommandIdController,
  getTranslationGetItemController,
  getTranslationSayByPlotFieldCommandIdController,
  getTranslationSayController,
  getTranslationSeasonController,
  getTranslationStoryController,
  getTranslationTextFieldNameAndSearchAssignedStoriesController,
  getTranslationTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesController,
  getTranslationTextFieldNameAndSearchController,
  getTranslationTextFieldNameController,
  getTranslationUpdatedAtAndLanguageController,
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
  .route("/recent")
  .get(getTranslationUpdatedAtAndLanguageController);

translationRoute
  .route("/plotFieldCommands/:commandId")
  .get(getTranslationByCommandIdController);

translationRoute
  .route("/textFieldNames")
  .get(getTranslationTextFieldNameController);

translationRoute
  .route("/textFieldNames/search")
  .get(getTranslationTextFieldNameAndSearchController);

translationRoute
  .route("/textFieldNames/stories/staff/:staffId/search")
  .get(getTranslationTextFieldNameAndSearchAssignedStoriesController);
translationRoute
  .route("/textFieldNames/stories/staff/:staffId/textFieldNames/status/search")
  .get(
    getTranslationTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesController
  );

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
  .route("/plotFieldCommands/:achievementId/achievements")
  .get(getTranslationAchievementByPlotFieldCommandIdController);

translationRoute
  .route("/plotFieldCommands/choices/:choiceId")
  .patch(updateChoiceTranslationController)
  .get(getTranslationChoiceController);
translationRoute
  .route("/plotFieldCommands/:choiceId/choices")
  .get(getTranslationChoiceByPlotFieldCommandIdController);

translationRoute
  .route("/plotFieldCommands/choices/options/:choiceOptionId")
  .patch(updateChoiceOptionTranslationController)
  .get(getTranslationChoiceOptionController);
translationRoute
  .route("/plotFieldCommands/choices/option/:choiceOptionId")
  .get(getSingleTranslationChoiceOptionController);

translationRoute
  .route("/plotFieldCommands/getItems/:getItemId")
  .patch(updateGetItemTranslationController)
  .get(getTranslationGetItemController);
translationRoute
  .route("/plotFieldCommands/:getItemId/getItems")
  .get(getTranslationGetItemByPlotFieldCommandIdController);

translationRoute
  .route("/plotFieldCommands/say/:sayId")
  .patch(updateSayTranslationTextController)
  .get(getTranslationSayController);
translationRoute
  .route("/plotFieldCommands/:sayId/say")
  .get(getTranslationSayByPlotFieldCommandIdController);

translationRoute
  .route("/plotFieldCommands/wardrobes/:commandWardrobeId")
  .patch(updateCommandWardrobeTranslationController)
  .get(getTranslationCommandWardrobeController);
translationRoute
  .route("/plotFieldCommands/:commandWardrobeId/wardrobes")
  .get(getTranslationCommandWardrobeByPlotFieldCommandIdController);
