import express from "express";
import {
  createAchievementDuplicateController,
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
  .route("/achievements/topologyBlocks/:topologyBlockId/copy")
  .post(createAchievementDuplicateController);

achievementRoute
  .route("/plotFieldCommands/achievements/:achievementId")
  .delete(deleteAchievementController);
