import { RequestHandler } from "express";
import {
  createSoundService,
  deleteSoundService,
} from "../../../../services/StoryEditor/Flowchart/Sound/SoundService";

type CreateSoundParams = {
  flowchartCommandId: string;
  storyId: string;
};

type CreateSoundBody = {
  soundName: string | undefined;
};

export const createSoundController: RequestHandler<
  CreateSoundParams,
  unknown,
  CreateSoundBody,
  unknown
> = async (req, res, next) => {
  try {
    const sound = await createSoundService({
      soundName: req.body.soundName,
      flowchartCommandId: req.params.flowchartCommandId,
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
