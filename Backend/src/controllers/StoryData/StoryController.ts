import { RequestHandler } from "express";
import {
  storyCreateService,
  storyDeleteService,
  storyUpdateGenreService,
  storyUpdateTitleService,
} from "../../services/StoryData/StoryService";

type StoryCreateBody = {
  title: string | undefined;
  imgUrl: string | undefined;
  genres: string[] | undefined;
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
  storyGenreId: string;
};
type StoryUpdateGenreBody = {
  genre: string | undefined;
};

// @route PATCH http://localhost:3500/stories/:storyId
// @access Private
export const storyUpdateGenreController: RequestHandler<
  StoryUpdateGenreParams,
  unknown,
  StoryUpdateGenreBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyUpdateGenreService({
      storyGenreId: req.params.storyGenreId,
      genre: req.body.genre,
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
