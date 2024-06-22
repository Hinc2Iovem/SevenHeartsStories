import { RequestHandler } from "express";
import {
  createAchievementService,
  deleteAchievementService,
  updateAchievementService,
} from "../../../../services/StoryEditor/Flowchart/Achievement/AchievementService";

type CreateAchievementParams = {
  storyId: string;
  flowchartCommandId: string;
};

export const createAchievementController: RequestHandler<
  CreateAchievementParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await createAchievementService({
      flowchartCommandId: req.params.flowchartCommandId,
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

type UpdateAchievementParams = {
  achievementId: string;
};

type UpdateAchievementBody = {
  achievementName: string | undefined;
};

export const updateAchievementController: RequestHandler<
  UpdateAchievementParams,
  unknown,
  UpdateAchievementBody,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await updateAchievementService({
      achievementId: req.params.achievementId,
      achievementName: req.body.achievementName,
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
