import { RequestHandler } from "express";
import {
  episodeCreateService,
  episodeDeleteService,
  episodeUpdateSeasonIdService,
  episodeGetByEpisodeIdService,
  episodeResetStatusService,
  episodesGetBySeasonIdService,
  episodeUpdateOrderService,
} from "../../services/StoryData/EpisodeService";

type EpisodeGetByEpisodeIdParams = {
  episodeId: string;
};

// @route GET http://localhost:3500/episodes/:episodeId
// @access Private
export const episodeGetByEpisodeIdController: RequestHandler<
  EpisodeGetByEpisodeIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeGetByEpisodeIdService({
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

type EpisodeGetBySeasonIdParams = {
  seasonId: string;
};

// @route GET http://localhost:3500/episodes/seasons/:seasonId
// @access Private
export const episodesGetBySeasonIdController: RequestHandler<
  EpisodeGetBySeasonIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episodes = await episodesGetBySeasonIdService({
      seasonId: req.params.seasonId,
    });
    if (episodes) {
      return res.status(201).json(episodes);
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

// @route POST http://localhost:3500/episodes/seasons/:seasonId
// @access Private
export const episodeCreateController: RequestHandler<
  EpisodeCreateParams,
  unknown,
  EpisodeCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeCreateService({
      description: req.body.description,
      seasonId: req.params.seasonId,
      title: req.body.title,
      currentLanguage: req.body.currentLanguage,
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

type EpisodeUpdateOrderParams = {
  episodeId: string;
};

type EpisodeUpdateOrderBody = {
  newOrder: number;
};

// @route PATCH http://localhost:3500/episodes/:episodeId/newOrder
// @access Private
export const episodeUpdateOrderController: RequestHandler<
  EpisodeUpdateOrderParams,
  unknown,
  EpisodeUpdateOrderBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeUpdateOrderService({
      episodeId: req.params.episodeId,
      newOrder: req.body.newOrder,
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
type EpisodeUpdateSeasonIdParams = {
  episodeId: string;
  newSeasonId: string;
};

// @route PATCH http://localhost:3500/episodes/:episodeId/seasons/:newSeasonId
// @access Private
export const episodeUpdateSeasonIdController: RequestHandler<
  EpisodeUpdateSeasonIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeUpdateSeasonIdService({
      episodeId: req.params.episodeId,
      newSeasonId: req.params.newSeasonId,
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

type EpisodeResetStatusParams = {
  episodeId: string;
};

// @route PATCH http://localhost:3500/episodes/:episodeId
// @access Private
export const episodeResetStatusController: RequestHandler<
  EpisodeResetStatusParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeResetStatusService({
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
