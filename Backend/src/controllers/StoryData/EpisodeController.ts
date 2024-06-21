import { RequestHandler } from "express";
import {
  episodeCreateService,
  episodeDeleteService,
  episodeUpdateService,
} from "../../services/StoryData/EpisodeService";

type EpisodeCreateParams = {
  seasonId: string;
};
type EpisodeCreateBody = {
  title: string | undefined;
};

// @route POST http://localhost:3500/episodes
// @access Private
export const episodeCreateController: RequestHandler<
  EpisodeCreateParams,
  unknown,
  EpisodeCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeCreateService({
      seasonId: req.params.seasonId,
      title: req.body.title,
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
  title: string | undefined;
};

// @route PATCH http://localhost:3500/episodes/:episodeId
// @access Private
export const episodeUpdateController: RequestHandler<
  EpisodeUpdateParams,
  unknown,
  EpisodeUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeUpdateService({
      episodeId: req.params.episodeId,
      title: req.body.title,
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

type EpisodeDeleteParams = {
  episodeId: string;
};

// @route DELETE http://localhost:3500/episodes/:episodeId
// @access Private
export const episodeDeleteController: RequestHandler<
  EpisodeDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeDeleteService({
      episodeId: req.params.episodeId,
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
