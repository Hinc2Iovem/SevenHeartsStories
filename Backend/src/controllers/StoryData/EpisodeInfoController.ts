import { RequestHandler } from "express";
import {
  episodeInfoUpdateStaffService,
  episodeInfoUpdateStatusService,
} from "../../services/StoryData/EpisodeInfoService";

type EpisodeInfoUpdateParams = {
  episodeInfoId: string;
  staffId: string;
};

// @route PATCH http://localhost:3500/episodeInfo/:episodeInfoId/staff/:staffId
// @access Private
export const episodeInfoUpdateController: RequestHandler<
  EpisodeInfoUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const episodeInfo = await episodeInfoUpdateStaffService({
      episodeInfoId: req.params.episodeInfoId,
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
  episodeInfoId: string;
};
type EpisodeInfoUpdateStatusBody = {
  episodeStatus: string | undefined;
};

// @route PATCH http://localhost:3500/episodeInfo/:episodeInfoId/status
// @access Private
export const episodeInfoUpdateStatusController: RequestHandler<
  EpisodeInfoUpdateStatusParams,
  unknown,
  EpisodeInfoUpdateStatusBody,
  unknown
> = async (req, res, next) => {
  try {
    const episodeInfo = await episodeInfoUpdateStatusService({
      episodeInfoId: req.params.episodeInfoId,
      episodeStatus: req.body.episodeStatus,
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
