import express from "express";
import {
  createAchievementController,
  deleteAchievementController,
  getAchievementByPlotFieldCommandIdController,
  getAchievementsByStoryIdController,
} from "../../../../controllers/StoryEditor/PlotField/Achievement/AchievementController";

// Default route === /stories
export const achievementRoute = express.Router();

achievementRoute
  .route("/:storyId/achievements")
  .get(getAchievementsByStoryIdController);

achievementRoute
  .route("/plotFieldCommands/:plotFieldCommandId/achievements")
  .get(getAchievementByPlotFieldCommandIdController);

achievementRoute
  .route("/:storyId/plotFieldCommands/:plotFieldCommandId/achievements")
  .post(createAchievementController);

achievementRoute
  .route("/plotFieldCommands/achievements/:achievementId")
  .delete(deleteAchievementController);
