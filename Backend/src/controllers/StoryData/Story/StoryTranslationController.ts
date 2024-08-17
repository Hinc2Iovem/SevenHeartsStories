import { RequestHandler } from "express";
import {
  getAllStoriesTranslationsByLanguageService,
  getAllStoriesTranslationsByTypeAndSearchService,
  getStoryByIdAndLanguageService,
  storyCreateService,
  storyTranslationUpdateService,
} from "../../../services/StoryData/Story/StoryTranslationService";

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
