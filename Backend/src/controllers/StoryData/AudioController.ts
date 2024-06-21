import { RequestHandler } from "express";
import { audioUpdateNameService } from "../../services/StoryData/AudioService";

type AudioUpdateParams = {
  audioId: string;
};

type AudioUpdateBody = {
  audioName: string | undefined;
};

// @route PATCH http://localhost:3500/audios/:audioId/name
// @access Private
export const audioControllerUpdateName: RequestHandler<
  AudioUpdateParams,
  unknown,
  AudioUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const audio = await audioUpdateNameService({
      audioName: req.body.audioName,
      audioId: req.params.audioId,
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
