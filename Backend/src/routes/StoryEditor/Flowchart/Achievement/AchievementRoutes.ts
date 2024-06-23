import express from "express";
import {
  createAchievementController,
  deleteAchievementController,
  updateAchievementController,
} from "../../../../controllers/StoryEditor/Flowchart/Achievement/AchievementController";

// Default route === /flowchartCommands
export const achievementRoute = express.Router();

achievementRoute
  .route("/:flowchartCommandId/achievements")
  .post(createAchievementController);

achievementRoute
  .route("/achievements/:achievementId")
  .patch(updateAchievementController)
  .delete(deleteAchievementController);
