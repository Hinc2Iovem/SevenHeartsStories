import { RequestHandler } from "express";
import {
  getAllAssignedStoriesTranslationsByLanguageAndStaffIdService,
  getAllStoriesTranslationsByLanguageService,
  getAllStoriesTranslationsByTypeAndSearchService,
  getPaginatedTranlsationStoriesService,
  getStoryByIdAndLanguageService,
  getPaginatedStoryTranslationUpdatedAtAndLanguageService,
  storyCreateService,
  storyTranslationUpdateService,
} from "../../../services/StoryData/Story/StoryTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/stories/paginated/recent/translations
// @access Private
export const getPaginatedStoryTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const stories =
      await getPaginatedStoryTranslationUpdatedAtAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
        page: req.query.page,
        limit: req.query.limit,
      });
    if (stories) {
      return res.status(201).json(stories);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetPaginatedTranslationStoriesQuery = {
  currentLanguage: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/stories/paginated/translations
// @access Private
export const getPaginatedTranslationStoriesController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetPaginatedTranslationStoriesQuery
> = async (req, res, next) => {
  try {
    const stories = await getPaginatedTranlsationStoriesService({
      currentLanguage: req.query.currentLanguage,
      limit: req.query.limit,
      page: req.query.page,
    });
    if (stories) {
      return res.status(201).json(stories);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllStoriesByLanguageAndStaffIdParams = {
  staffId: string;
};
type GetAllStoriesByLanguageAndStaffIdQuery = {
  currentLanguage?: string;
  text?: string;
  storyStatus?: string;
};

// @route GET http://localhost:3500/stories/staff/:staffId/search/translations
// @access Private
export const getAllAssignedStoriesTranslationsByLanguageAndStaffIdController: RequestHandler<
  GetAllStoriesByLanguageAndStaffIdParams,
  unknown,
  unknown,
  GetAllStoriesByLanguageAndStaffIdQuery
> = async (req, res, next) => {
  try {
    const story =
      await getAllAssignedStoriesTranslationsByLanguageAndStaffIdService({
        staffId: req.params.staffId,
        currentLanguage: req.query.currentLanguage,
        text: req.query.text,
        storyStatus: req.query.storyStatus,
      });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
type GetAllStoriesByLanguageQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/stories/translations
// @access Private
export const getAllStoriesTranslationsByLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetAllStoriesByLanguageQuery
> = async (req, res, next) => {
  try {
    const story = await getAllStoriesTranslationsByLanguageService({
      currentLanguage: req.query.currentLanguage,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetStoryByIdParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/translations
// @access Private
export const storyGetByIdController: RequestHandler<
  GetStoryByIdParams,
  unknown,
  unknown,
  GetAllStoriesByLanguageQuery
> = async (req, res, next) => {
  try {
    const story = await getStoryByIdAndLanguageService({
      storyId: req.params.storyId,
      currentLanguage: req.query.currentLanguage,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllAssignedStoriesTranslationQuery = {
  currentLanguage?: string;
  storyStatus?: string;
  text?: string;
};
// @route GET http://localhost:3500/stories/storyStatus/search/translations
// @access Private
export const getAllStoriesTranslationsByTypeAndSearchController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetAllAssignedStoriesTranslationQuery
> = async (req, res, next) => {
  try {
    const storyInfo = await getAllStoriesTranslationsByTypeAndSearchService({
      currentLanguage: req.query.currentLanguage,
      storyStatus: req.query.storyStatus,
      text: req.query.text,
    });
    if (storyInfo) {
      return res.status(201).json(storyInfo);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryCreateBody = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
  imgUrl: string | undefined;
  genres: string | undefined;
};

// @route POST http://localhost:3500/stories/translations
// @access Private
export const storyCreateController: RequestHandler<
  unknown,
  unknown,
  StoryCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyCreateService({
      currentLanguage: req.body.currentLanguage,
      description: req.body.description,
      title: req.body.title,
      genres: req.body.genres,
      imgUrl: req.body.imgUrl,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryUpdateParams = {
  storyId: string;
};

type StoryUpdateBody = {
  currentLanguage?: string;
  textFieldName?: string;
  text?: string;
};

// @route PATCH http://localhost:3500/stories/:storyId/translations
// @access Private
export const storyTranslationUpdateController: RequestHandler<
  StoryUpdateParams,
  unknown,
  StoryUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyTranslationUpdateService({
      storyId: req.params.storyId,
      currentLanguage: req.body.currentLanguage,
      text: req.body.text,
      textFieldName: req.body.textFieldName,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
