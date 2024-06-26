import { RequestHandler } from "express";
import {
  createSoundService,
  deleteSoundService,
  updateSoundIsGlobalService,
  updateSoundService,
} from "../../../../services/StoryEditor/Flowchart/Sound/SoundService";

type CreateSoundParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/sounds
// @access Private
export const createSoundController: RequestHandler<
  CreateSoundParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await createSoundService({
      flowchartCommandId: req.params.flowchartCommandId,
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
  soundId: string;
  storyId: string;
};

type UpdateSoundBody = {
  soundName: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/sounds/:soundId/stories/:storyId
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
      soundId: req.params.soundId,
      storyId: req.params.storyId,
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

// @route PATCH http://localhost:3500/flowchartCommands/sounds/:soundId/isGlobal
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

// @route DELETE http://localhost:3500/flowchartCommands/sounds/:soundId
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
