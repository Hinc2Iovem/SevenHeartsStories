import { RequestHandler } from "express";
import {
  createSoundService,
  deleteSoundService,
  updateSoundService,
} from "../../../../services/StoryEditor/Flowchart/Sound/SoundService";

type CreateSoundParams = {
  flowchartCommandId: string;
};

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

type DeleteSoundParams = {
  soundId: string;
};

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
