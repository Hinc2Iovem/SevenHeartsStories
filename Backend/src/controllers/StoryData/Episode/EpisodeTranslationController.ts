import { RequestHandler } from "express";
import {
  getAllEpisodesTranslationsBySeasonIdAndLanguageService,
  episodeCreateService,
  episodeTranslationUpdateService,
  getAllEpisodesTranslationsByTypeAndSearchService,
  getEpisodeByIdAndLanguageService,
  getPaginatedEpisodeTranslationUpdatedAtAndLanguageService,
  getPaginatedTranlsationEpisodesService,
} from "../../../services/StoryData/Episode/EpisodeTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/episodes/paginated/recent/translations
// @access Private
export const getPaginatedEpisodeTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getPaginatedEpisodeTranslationUpdatedAtAndLanguageService({
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

type GetPaginatedTranlsationEpisodesQuery = {
  currentLanguage: string | undefined;
  seasonId: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/episodes/paginated/translations
// @access Private
export const getPaginatedTranlsationEpisodesController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetPaginatedTranlsationEpisodesQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getPaginatedTranlsationEpisodesService({
      currentLanguage: req.query.currentLanguage,
      seasonId: req.query.seasonId,
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

type GetEpisodesBySeasonIdParams = {
  seasonId: string;
};

type GetAllEpisodesByLanguageQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/episodes/translations
// @access Private
export const getAllEpisodesTranslationsBySeasonIdAndLanguageController: RequestHandler<
  GetEpisodesBySeasonIdParams,
  unknown,
  unknown,
  GetAllEpisodesByLanguageQuery
> = async (req, res, next) => {
  try {
    const episode =
      await getAllEpisodesTranslationsBySeasonIdAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        seasonId: req.params.seasonId,
      });
    if (episode) {
      return res.status(201).json(episode);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetEpisodeByIdParams = {
  episodeId: string;
};

// @route GET http://localhost:3500/episodes/:episodeId/translations
// @access Private
export const episodeGetByIdController: RequestHandler<
  GetEpisodeByIdParams,
  unknown,
  unknown,
  GetAllEpisodesByLanguageQuery
> = async (req, res, next) => {
  try {
    const episode = await getEpisodeByIdAndLanguageService({
      episodeId: req.params.episodeId,
      currentLanguage: req.query.currentLanguage,
    });
    if (episode) {
      return res.status(201).json(episode);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllAssignedEpisodesTranslationQuery = {
  currentLanguage?: string;
  episodeStatus?: string;
  text?: string;
  seasonId?: string;
};
// @route GET http://localhost:3500/episodes/episodeStatus/search/translations
// @access Private
export const getAllEpisodesTranslationsByTypeAndSearchController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetAllAssignedEpisodesTranslationQuery
> = async (req, res, next) => {
  try {
    const episodeInfo = await getAllEpisodesTranslationsByTypeAndSearchService({
      currentLanguage: req.query.currentLanguage,
      episodeStatus: req.query.episodeStatus,
      text: req.query.text,
      seasonId: req.query.seasonId,
    });
    if (episodeInfo) {
      return res.status(201).json(episodeInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type EpisodeCreateParams = {
  seasonId: string;
};
type EpisodeCreateBody = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/episodes/translations
// @access Private
export const episodeCreateController: RequestHandler<
  EpisodeCreateParams,
  unknown,
  EpisodeCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeCreateService({
      currentLanguage: req.body.currentLanguage,
      description: req.body.description,
      title: req.body.title,
      seasonId: req.params.seasonId,
    });
    if (episode) {
      return res.status(201).json(episode);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type EpisodeUpdateParams = {
  episodeId: string;
};

type EpisodeUpdateBody = {
  currentLanguage?: string;
  textFieldName?: string;
  seasonId?: string;
  text?: string;
};

// @route PATCH http://localhost:3500/episodes/:episodeId/translations
// @access Private
export const episodeTranslationUpdateController: RequestHandler<
  EpisodeUpdateParams,
  unknown,
  EpisodeUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeTranslationUpdateService({
      episodeId: req.params.episodeId,
      currentLanguage: req.body.currentLanguage,
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      seasonId: req.body.seasonId,
    });
    if (episode) {
      return res.status(201).json(episode);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
