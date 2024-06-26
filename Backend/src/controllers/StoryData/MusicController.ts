import { RequestHandler } from "express";
import { getMusicService } from "../../services/StoryData/MusicService";

type AudioUpdateParams = {
  storyId: string;
};

// @route GET http://localhost:3500/stories/:storyId/music
// @access Private
export const getMusicController: RequestHandler<
  AudioUpdateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const audio = await getMusicService({
      storyId: req.params.storyId,
    });
    if (audio) {
      return res.status(201).json(audio);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
