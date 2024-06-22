import { RequestHandler } from "express";
import {
  createMusicService,
  deleteMusicService,
} from "../../../../services/StoryEditor/Flowchart/Music/MusicService";

type CreateMusicParams = {
  flowchartCommandId: string;
};

type CreateMusicBody = {
  musicName: string | undefined;
};

export const createMusicController: RequestHandler<
  CreateMusicParams,
  unknown,
  CreateMusicBody,
  unknown
> = async (req, res, next) => {
  try {
    const music = await createMusicService({
      musicName: req.body.musicName,
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
