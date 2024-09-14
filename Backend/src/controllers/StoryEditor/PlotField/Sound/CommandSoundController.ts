import { RequestHandler } from "express";
import {
  createSoundService,
  deleteSoundService,
  updateSoundIsGlobalService,
  updateSoundService,
  getSoundByPlotFieldCommandIdService,
  createSoundDuplicateService,
} from "../../../../services/StoryEditor/PlotField/Sound/CommandSoundService";

type GetSoundByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/sounds
// @access Private
export const getSoundByPlotFieldCommandIdController: RequestHandler<
  GetSoundByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await getSoundByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (sound) {
      return res.status(201).json(sound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateSoundParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/sounds
// @access Private
export const createSoundController: RequestHandler<
  CreateSoundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await createSoundService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (sound) {
      return res.status(201).json(sound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateSoundDuplicateParams = {
  topologyBlockId: string;
};

type CreateSoundDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/sounds/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createSoundDuplicateController: RequestHandler<
  CreateSoundDuplicateParams,
  unknown,
  CreateSoundDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await createSoundDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
    });
    if (sound) {
      return res.status(201).json(sound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateSoundParams = {
  storyId: string;
  commandSoundId: string;
};

type UpdateSoundBody = {
  soundName: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/stories/:storyId/commandSounds/:commandSoundId
// @access Private
export const updateSoundController: RequestHandler<
  UpdateSoundParams,
  unknown,
  UpdateSoundBody,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await updateSoundService({
      soundName: req.body.soundName,
      storyId: req.params.storyId,
      commandSoundId: req.params.commandSoundId,
    });
    if (sound) {
      return res.status(201).json(sound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateSoundIsGlobalParams = {
  soundId: string;
};

type UpdateSoundIsGlobalBody = {
  isGlobal: boolean | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/sounds/:soundId/isGlobal
// @access Private
export const updateSoundIsGlobalController: RequestHandler<
  UpdateSoundIsGlobalParams,
  unknown,
  UpdateSoundIsGlobalBody,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await updateSoundIsGlobalService({
      isGlobal: req.body.isGlobal,
      soundId: req.params.soundId,
    });
    if (sound) {
      return res.status(201).json(sound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteSoundParams = {
  soundId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/sounds/:soundId
// @access Private
export const deleteSoundController: RequestHandler<
  DeleteSoundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await deleteSoundService({
      soundId: req.params.soundId,
    });
    if (sound) {
      return res.status(201).json(sound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
