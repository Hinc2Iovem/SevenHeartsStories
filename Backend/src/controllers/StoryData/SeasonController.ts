import { RequestHandler } from "express";
import {
  seasonCreateService,
  seasonDeleteService,
  seasonUpdateTitleService,
} from "../../services/StoryData/SeasonService";

type SeasonCreateParams = {
  storyId: string;
};

type SeasonCreateBody = {
  title: string | undefined;
};

// @route POST http://localhost:3500/seasons
// @access Private
export const seasonCreateController: RequestHandler<
  SeasonCreateParams,
  unknown,
  SeasonCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonCreateService({
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

type SeasonUpdateTitleParams = {
  seasonId: string;
};
type SeasonUpdateTitleBody = {
  title: string | undefined;
};

// @route PATCH http://localhost:3500/seasons/:seasonId
// @access Private
export const seasonUpdateTitleController: RequestHandler<
  SeasonUpdateTitleParams,
  unknown,
  SeasonUpdateTitleBody,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonUpdateTitleService({
      seasonId: req.params.seasonId,
      title: req.body.title,
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
