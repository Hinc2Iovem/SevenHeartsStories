import { RequestHandler } from "express";
import {
  achievementTranslationByCommandIdService,
  achievementUpdateTranslationService,
  createAchievementTranslationService,
  getAchievementTranslationUpdatedAtAndLanguageService,
  getAllAchievementsTranslationByStoryIdService,
  getAllAchievementsTranslationByTopologyBlockIdService,
} from "../../../../services/StoryEditor/PlotField/Achievement/AchievementTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/achievements/paginated/recent/translations
// @access Private
export const getAchievementTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getAchievementTranslationUpdatedAtAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
        page: req.query.page,
        limit: req.query.limit,
      });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type AchievementByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};
type AchievementByPlotFieldCommandIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/achievements/:plotFieldCommandId/translations
// @access Private
export const achievementTranslationByCommandIdController: RequestHandler<
  AchievementByPlotFieldCommandIdParams,
  unknown,
  unknown,
  AchievementByPlotFieldCommandIdQueries
> = async (req, res, next) => {
  try {
    const achievement = await achievementTranslationByCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      currentLanguage: req.query.currentLanguage,
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

type AchievementByStoryIdParams = {
  storyId: string;
};
type AchievementByStoryIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/achievements/stories/:storyId/translations
// @access Private
export const getAllAchievementsTranslationByStoryIdController: RequestHandler<
  AchievementByStoryIdParams,
  unknown,
  unknown,
  AchievementByStoryIdQueries
> = async (req, res, next) => {
  try {
    const achievement = await getAllAchievementsTranslationByStoryIdService({
      storyId: req.params.storyId,
      currentLanguage: req.query.currentLanguage,
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

type AchievementByTopologyBlockIdParams = {
  topologyBlockId: string;
};
type AchievementByTopologyBlockIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/achievements/topologyBlocks/:topologyBlockId/translations
// @access Private
export const getAllAchievementsTranslationByTopologyBlockIdController: RequestHandler<
  AchievementByTopologyBlockIdParams,
  unknown,
  unknown,
  AchievementByTopologyBlockIdQueries
> = async (req, res, next) => {
  try {
    const achievement =
      await getAllAchievementsTranslationByTopologyBlockIdService({
        topologyBlockId: req.params.topologyBlockId,
        currentLanguage: req.query.currentLanguage,
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
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type CreateAchievementBody = {
  storyId: string;
};

// @route POST http://localhost:3500/achievements/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const createAchievementTranslationController: RequestHandler<
  CreateAchievementParams,
  unknown,
  CreateAchievementBody,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await createAchievementTranslationService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
      storyId: req.body.storyId,
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

type AchievementUpdateTranslationParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type AchievementUpdateTranslationBody = {
  storyId: string;
  textFieldName: string;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/achievements/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const achievementUpdateTranslationController: RequestHandler<
  AchievementUpdateTranslationParams,
  unknown,
  AchievementUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await achievementUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
      storyId: req.body.storyId,
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
