import { RequestHandler } from "express";
import {
  storyCreateService,
  storyDeleteService,
  storyUpdateGenreService,
  storyUpdateImgService,
  storyUpdateTitleService,
  storyGetAllService,
} from "../../services/StoryData/StoryService";

// @route GET http://localhost:3500/stories
// @access Private
export const storyGetAllController: RequestHandler = async (req, res, next) => {
  try {
    const story = await storyGetAllService();
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type StoryCreateBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
  imgUrl: string | undefined;
  genres: string | undefined;
};

// @route POST http://localhost:3500/stories
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

type StoryUpdateTitleParams = {
  storyId: string;
};
type StoryUpdateTitleBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/stories/:storyId
// @access Private
export const storyUpdateTitleController: RequestHandler<
  StoryUpdateTitleParams,
  unknown,
  StoryUpdateTitleBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyUpdateTitleService({
      storyId: req.params.storyId,
      title: req.body.title,
      currentLanguage: req.body.currentLanguage,
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

type StoryUpdateImgUrlParams = {
  storyId: string;
};
type StoryUpdateImgUrlBody = {
  imgUrl: string | undefined;
};

// @route PATCH http://localhost:3500/stories/:storyId/img
// @access Private
export const storyUpdateImgUrlController: RequestHandler<
  StoryUpdateImgUrlParams,
  unknown,
  StoryUpdateImgUrlBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyUpdateImgService({
      storyId: req.params.storyId,
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

type StoryUpdateGenreParams = {
  storyId: string;
};
type StoryUpdateGenreBody = {
  genre: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/stories/:storyId/genre
// @access Private
export const storyUpdateGenreController: RequestHandler<
  StoryUpdateGenreParams,
  unknown,
  StoryUpdateGenreBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyUpdateGenreService({
      storyId: req.params.storyId,
      genre: req.body.genre,
      currentLanguage: req.body.currentLanguage,
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

type StoryDeleteParams = {
  storyId: string;
};

// @route DELETE http://localhost:3500/stories/:storyId
// @access Private
export const storyDeleteController: RequestHandler<
  StoryDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyDeleteService({
      storyId: req.params.storyId,
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
