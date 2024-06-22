import { RequestHandler } from "express";
import {
  createAchievementService,
  deleteAchievementService,
} from "../../../../services/StoryEditor/Flowchart/Achievement/AchievementService";

type CreateAchievementParams = {
  storyId: string;
  flowchartCommandId: string;
};

type CreateAchievementBody = {
  achievementName: string | undefined;
};

export const createAchievementController: RequestHandler<
  CreateAchievementParams,
  unknown,
  CreateAchievementBody,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await createAchievementService({
      achievementName: req.body.achievementName,
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
