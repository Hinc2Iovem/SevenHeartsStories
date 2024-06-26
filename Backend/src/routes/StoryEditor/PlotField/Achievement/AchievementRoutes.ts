import express from "express";
import {
  createAchievementController,
  deleteAchievementController,
  updateAchievementController,
} from "../../../../controllers/StoryEditor/PlotField/Achievement/AchievementController";

// Default route === /plotFieldCommands
export const achievementRoute = express.Router();

achievementRoute
  .route("/:plotFieldCommandId/achievements")
  .post(createAchievementController);

achievementRoute
  .route("/achievements/:achievementId")
  .patch(updateAchievementController)
  .delete(deleteAchievementController);
