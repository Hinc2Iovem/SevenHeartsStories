import { RequestHandler } from "express";
import {
  getAllSeasonsTranslationsAndSearchService,
  getAllSeasonsTranslationsByStoryIdAndLanguageService,
  getPaginatedTranlsationSeasonsService,
  getSeasonByIdAndLanguageService,
  getPaginatedSeasonTranslationUpdatedAtAndLanguageService,
  seasonCreateService,
  seasonTranslationUpdateService,
  getCheckSeasonTranslationCompletnessByStoryIdService,
} from "../../../services/StoryData/Season/SeasonTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/seasons/paginated/recent/translations
// @access Private
export const getPaginatedSeasonTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getPaginatedSeasonTranslationUpdatedAtAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
        limit: req.query.limit,
        page: req.query.page,
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

type GetPaginatedTranlsationSeasonsQuery = {
  currentLanguage: string | undefined;
  limit: number | undefined;
  page: number | undefined;
  storyId: string | undefined;
};

// @route GET http://localhost:3500/seasons/paginated/translations
// @access Private
export const getPaginatedTranlsationSeasonsController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetPaginatedTranlsationSeasonsQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getPaginatedTranlsationSeasonsService({
      currentLanguage: req.query.currentLanguage,
      page: req.query.page,
      limit: req.query.limit,
      storyId: req.query.storyId,
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

type GetCheckSeasonTranslationCompletnessByStoryIdParams = {
  storyId: string;
};

type GetCheckSeasonTranslationCompletnessByStoryIdQuery = {
  currentLanguage: string | undefined;
  translateToLanguage: string | undefined;
};

// @route GET http://localhost:3500/seasons/stories/:storyId/completness/translations
// @access Private
export const getCheckSeasonTranslationCompletnessByStoryIdController: RequestHandler<
  GetCheckSeasonTranslationCompletnessByStoryIdParams,
  unknown,
  unknown,
  GetCheckSeasonTranslationCompletnessByStoryIdQuery
> = async (req, res, next) => {
  try {
    const seasons = await getCheckSeasonTranslationCompletnessByStoryIdService({
      storyId: req.params.storyId,
      currentLanguage: req.query.currentLanguage,
      translateToLanguage: req.query.translateToLanguage,
    });
    if (typeof seasons === "boolean") {
      return res.status(201).json(seasons);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetSeasonsBySeasonIdParams = {
  storyId: string;
};

type GetAllSeasonsByLanguageQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/seasons/stories/:storyId/translations
// @access Private
export const getAllSeasonsTranslationsByStoryIdAndLanguageController: RequestHandler<
  GetSeasonsBySeasonIdParams,
  unknown,
  unknown,
  GetAllSeasonsByLanguageQuery
> = async (req, res, next) => {
  try {
    const season = await getAllSeasonsTranslationsByStoryIdAndLanguageService({
      currentLanguage: req.query.currentLanguage,
      storyId: req.params.storyId,
    });
    if (season) {
      return res.status(201).json(season);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetSeasonByIdParams = {
  seasonId: string;
};

// @route GET http://localhost:3500/seasons/:seasonId/translations
// @access Private
export const seasonGetByIdController: RequestHandler<
  GetSeasonByIdParams,
  unknown,
  unknown,
  GetAllSeasonsByLanguageQuery
> = async (req, res, next) => {
  try {
    const season = await getSeasonByIdAndLanguageService({
      seasonId: req.params.seasonId,
      currentLanguage: req.query.currentLanguage,
    });
    if (season) {
      return res.status(201).json(season);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllAssignedSeasonsTranslationQuery = {
  currentLanguage?: string;
  storyId?: string;
  text?: string;
};
// @route GET http://localhost:3500/seasons/stories/search/translations
// @access Private
export const getAllSeasonsTranslationsAndSearchController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetAllAssignedSeasonsTranslationQuery
> = async (req, res, next) => {
  try {
    const seasonInfo = await getAllSeasonsTranslationsAndSearchService({
      currentLanguage: req.query.currentLanguage,
      text: req.query.text,
      storyId: req.query.storyId,
    });
    if (seasonInfo) {
      return res.status(201).json(seasonInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type SeasonCreateParams = {
  storyId: string;
};
type SeasonCreateBody = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/seasons/stories/:storyId/translations
// @access Private
export const seasonCreateController: RequestHandler<
  SeasonCreateParams,
  unknown,
  SeasonCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonCreateService({
      currentLanguage: req.body.currentLanguage,
      title: req.body.title,
      storyId: req.params.storyId,
    });
    if (season) {
      return res.status(201).json(season);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type SeasonUpdateParams = {
  seasonId: string;
};

type SeasonUpdateBody = {
  currentLanguage?: string;
  textFieldName?: string;
  seasonId: string;
  storyId?: string;
  text?: string;
};

// @route PATCH http://localhost:3500/seasons/:seasonId/translations
// @access Private
export const seasonTranslationUpdateController: RequestHandler<
  SeasonUpdateParams,
  unknown,
  SeasonUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonTranslationUpdateService({
      currentLanguage: req.body.currentLanguage,
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      seasonId: req.params.seasonId,
      storyId: req.body.storyId,
    });
    if (season) {
      return res.status(201).json(season);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
