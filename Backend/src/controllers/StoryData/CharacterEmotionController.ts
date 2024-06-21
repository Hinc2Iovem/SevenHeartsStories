import { RequestHandler } from "express";
import { characterEmotionCreateService } from "../../services/StoryData/CharacterEmotionService";

type CharacterEmotionCreateParams = {
  characterId: string;
};
type CharacterEmotionCreateBody = {
  emotionName: string | undefined;
};

export const characterEmotionCreateController: RequestHandler<
  CharacterEmotionCreateParams,
  unknown,
  CharacterEmotionCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterEmotionCreateService({
      characterId: req.params.characterId,
      emotionName: req.body.emotionName,
    });
    if (character) {
      return res.status(201).json(character);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
