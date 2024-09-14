import { RequestHandler } from "express";
import {
  createMusicService,
  deleteMusicService,
  updateMusicService,
  getMusicByPlotFieldCommandIdService,
  createMusicDuplicateService,
} from "../../../../services/StoryEditor/PlotField/Music/CommandMusicService";

type GetMusicByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/music
// @access Private
export const getMusicByPlotFieldCommandIdController: RequestHandler<
  GetMusicByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const music = await getMusicByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateMusicParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/music
// @access Private
export const createMusicController: RequestHandler<
  CreateMusicParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const music = await createMusicService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateMusicDuplicateParams = {
  topologyBlockId: string;
};
type CreateMusicDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/music/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createMusicDuplicateController: RequestHandler<
  CreateMusicDuplicateParams,
  unknown,
  CreateMusicDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const music = await createMusicDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
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
  commandMusicId: string;
  storyId: string;
};

type UpdateMusicBody = {
  musicName: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/stories/:storyId/commandMusic/:commandMusicId
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
      commandMusicId: req.params.commandMusicId,
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

type DeleteMusicParams = {
  musicId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/music/:musicId
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
