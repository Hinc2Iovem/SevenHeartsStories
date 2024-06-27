import express from "express";
import {
  createAchievementController,
  deleteAchievementController,
  updateAchievementController,
} from "../../../../controllers/StoryEditor/PlotField/Achievement/AchievementController";

// Default route === /stories
export const achievementRoute = express.Router();

achievementRoute
  .route("/:storyId/plotFieldCommands/:plotFieldCommandId/achievements")
  .post(createAchievementController);

achievementRoute
  .route("/plotFieldCommands/achievements/:achievementId")
  .patch(updateAchievementController)
  .delete(deleteAchievementController);
