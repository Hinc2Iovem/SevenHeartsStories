import { RequestHandler } from "express";
import {
  createMusicService,
  deleteMusicService,
  updateMusicService,
} from "../../../../services/StoryEditor/Flowchart/Music/MusicService";

type CreateMusicParams = {
  flowchartCommandId: string;
};

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
