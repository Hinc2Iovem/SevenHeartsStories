import { RequestHandler } from "express";
import {
  episodeAssignWorkerService,
  episodeUpdateStatusService,
} from "../../services/StoryData/EpisodeInfoService";

type EpisodeInfoUpdateParams = {
  episodeId: string;
  staffId: string;
};

// @route PATCH http://localhost:3500/episodes/:episodeId/staff/:staffId
// @access Private
export const episodeAssingWorkersController: RequestHandler<
  EpisodeInfoUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episodeInfo = await episodeAssignWorkerService({
      episodeId: req.params.episodeId,
      staffId: req.params.staffId,
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

type EpisodeInfoUpdateStatusParams = {
  episodeId: string;
  staffId: string;
};
type EpisodeInfoUpdateStatusBody = {
  episodeStatus: string | undefined;
};

// @route PATCH http://localhost:3500/episodes/:episodeId/staff/:staffId/status
// @access Private
export const episodeInfoUpdateStatusController: RequestHandler<
  EpisodeInfoUpdateStatusParams,
  unknown,
  EpisodeInfoUpdateStatusBody,
  unknown
> = async (req, res, next) => {
  try {
    const episodeInfo = await episodeUpdateStatusService({
      episodeStatus: req.body.episodeStatus,
      episodeId: req.params.episodeId,
      staffId: req.params.staffId,
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
