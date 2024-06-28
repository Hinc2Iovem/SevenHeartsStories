import { RequestHandler } from "express";
import {
  getMusicByIdService,
  getMusicService,
} from "../../services/StoryData/MusicService";

type GetAllMusicParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/music
// @access Private
export const getMusicController: RequestHandler<
  GetAllMusicParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const music = await getMusicService({
      storyId: req.params.storyId,
    });
    if (music) {
      return res.status(201).json(music);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetMusicByIdParams = {
  musicId: string;
};

// @route GET http://localhost:3500/stories/music/:musicId
// @access Private
export const getMusicByIdController: RequestHandler<
  GetMusicByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const singleMusic = await getMusicByIdService({
      musicId: req.params.musicId,
    });
    if (singleMusic) {
      return res.status(201).json(singleMusic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
