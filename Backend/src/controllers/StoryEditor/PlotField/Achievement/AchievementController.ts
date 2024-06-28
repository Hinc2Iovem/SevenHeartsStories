import { RequestHandler } from "express";
import {
  createAchievementService,
  deleteAchievementService,
  getAchievementByPlotFieldCommandIdService,
  getAchievementsByStoryIdService,
} from "../../../../services/StoryEditor/PlotField/Achievement/AchievementService";

type GetAchievementByStoryIdParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/achievements
// @access Private
export const getAchievementsByStoryIdController: RequestHandler<
  GetAchievementByStoryIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const achievements = await getAchievementsByStoryIdService({
      storyId: req.params.storyId,
    });
    if (achievements) {
      return res.status(201).json(achievements);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAchievementByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/stories/plotFieldCommands/:plotFieldCommandId/achievements
// @access Private
export const getAchievementByPlotFieldCommandIdController: RequestHandler<
  GetAchievementByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await getAchievementByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (achievement) {
      return res.status(201).json(achievement);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateAchievementParams = {
  storyId: string;
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/stories/:storyId/plotFieldCommands/:plotFieldCommandId/achievements
// @access Private
export const createAchievementController: RequestHandler<
  CreateAchievementParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await createAchievementService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      storyId: req.params.storyId,
    });
    if (achievement) {
      return res.status(201).json(achievement);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteAchievementParams = {
  achievementId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/achievements/:achievementId
// @access Private
export const deleteAchievementController: RequestHandler<
  DeleteAchievementParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await deleteAchievementService({
      achievementId: req.params.achievementId,
    });
    if (achievement) {
      return res.status(201).json(achievement);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
