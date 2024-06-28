import { RequestHandler } from "express";
import {
  seasonCreateService,
  seasonDeleteService,
  seasonsGetByStoryIdService,
} from "../../services/StoryData/SeasonService";

type SeasonsGetByStoryIdParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/seasons
// @access Private
export const seasonsGetByStoryIdController: RequestHandler<
  SeasonsGetByStoryIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonsGetByStoryIdService({
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

type SeasonCreateParams = {
  storyId: string;
};

type SeasonCreateBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/stories/:storyId/seasons
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

type SeasonDeleteParams = {
  seasonId: string;
};

// @route DELETE http://localhost:3500/seasons/:seasonId
// @access Private
export const seasonDeleteController: RequestHandler<
  SeasonDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonDeleteService({
      seasonId: req.params.seasonId,
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
