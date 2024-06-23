import { RequestHandler } from "express";
import {
  createMusicService,
  deleteMusicService,
  updateMusicService,
} from "../../../../services/StoryEditor/Flowchart/Music/MusicService";

type CreateMusicParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/music
// @access Private
export const createMusicController: RequestHandler<
  CreateMusicParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const music = await createMusicService({
      flowchartCommandId: req.params.flowchartCommandId,
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

type UpdateMusicParams = {
  musicId: string;
};

type UpdateMusicBody = {
  musicName: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/music/:musicId
// @access Private
export const updateMusicController: RequestHandler<
  UpdateMusicParams,
  unknown,
  UpdateMusicBody,
  unknown
> = async (req, res, next) => {
  try {
    const music = await updateMusicService({
      musicName: req.body.musicName,
      musicId: req.params.musicId,
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

type DeleteMusicParams = {
  musicId: string;
};

// @route DELETE http://localhost:3500/flowchartCommands/music/:musicId
// @access Private
export const deleteMusicController: RequestHandler<
  DeleteMusicParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const music = await deleteMusicService({
      musicId: req.params.musicId,
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
