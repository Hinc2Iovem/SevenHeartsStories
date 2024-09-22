import express from "express";
import {
  achievementTranslationByCommandIdController,
  createAchievementTranslationController,
  achievementUpdateTranslationController,
  getAllAchievementsTranslationByTopologyBlockIdController,
  getAllAchievementsTranslationByStoryIdController,
  getAchievementTranslationUpdatedAtAndLanguageController,
} from "../../../../controllers/StoryEditor/PlotField/Achievement/AchievementTranslationController";

// Default route === /achievements
export const achievementTranslationsRoute = express.Router();

achievementTranslationsRoute
  .route("/paginated/recent/translations")
  .get(getAchievementTranslationUpdatedAtAndLanguageController);

achievementTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(achievementTranslationByCommandIdController);

achievementTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createAchievementTranslationController)
  .patch(achievementUpdateTranslationController);

achievementTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllAchievementsTranslationByTopologyBlockIdController);

achievementTranslationsRoute
  .route("/stories/:storyId/translations")
  .get(getAllAchievementsTranslationByStoryIdController);
