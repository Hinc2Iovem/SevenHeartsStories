import { RequestHandler } from "express";
import {
  storyCreateService,
  storyDeleteService,
  storyUpdateImgService,
  storyGetAllService,
  storyGetAllByStatusService,
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

type GetStoryByStatusBody = {
  storyStatus: string | undefined;
};

// @route GET http://localhost:3500/stories/status
// @access Private
export const storyGetAllByStatusController: RequestHandler<
  unknown,
  unknown,
  GetStoryByStatusBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyGetAllByStatusService({
      storyStatus: req.body.storyStatus,
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

type StoryCreateBody = {
  title: string | undefined;
  description: string | undefined;
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
