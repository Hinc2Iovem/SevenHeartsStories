import { RequestHandler } from "express";
import {
  getAllSoundsService,
  getSoundByIdService,
  getSoundsByStoryIdService,
} from "../../services/StoryData/SoundService";

// @route GET http://localhost:3500/stories/:storyId/sounds
// @access Private
export const getAllSoundsController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const sounds = await getAllSoundsService();
    if (sounds) {
      return res.status(201).json(sounds);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAllByStoryIdParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/sounds
// @access Private
export const getSoundsByStoryIdController: RequestHandler<
  GetAllByStoryIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const sounds = await getSoundsByStoryIdService({
      storyId: req.params.storyId,
    });
    if (sounds) {
      return res.status(201).json(sounds);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetSoundByIdParams = {
  soundId: string;
};

// @route GET http://localhost:3500/stories/sound/:soundId
// @access Private
export const getSoundByIdController: RequestHandler<
  GetSoundByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const singleSound = await getSoundByIdService({
      soundId: req.params.soundId,
    });
    if (singleSound) {
      return res.status(201).json(singleSound);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
