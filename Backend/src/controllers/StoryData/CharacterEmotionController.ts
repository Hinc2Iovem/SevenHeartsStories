import { RequestHandler } from "express";
import {
  characterEmotionCreateService,
  characterEmotionDeleteService,
  characterEmotionGetByCharacterIdService,
  characterEmotionGetByIdService,
  characterEmotionUpdateImgService,
  characterEmotionUpdateService,
} from "../../services/StoryData/CharacterEmotionService";

type CharacterEmotionGetByIdParams = {
  characterEmotionId: string;
};

// @route GET http://localhost:3500/characterEmotions/:characterEmotionId
// @access Private
export const characterEmotionGetByIdController: RequestHandler<
  CharacterEmotionGetByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterEmotionGetByIdService({
      characterEmotionId: req.params.characterEmotionId,
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

type CharacterEmotionGetByCharacterIdParams = {
  characterId: string;
};

// @route GET http://localhost:3500/characterEmotions/characters/:characterId
// @access Private
export const characterEmotionGetByCharacterIdController: RequestHandler<
  CharacterEmotionGetByCharacterIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterEmotionGetByCharacterIdService({
      characterId: req.params.characterId,
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

type CharacterEmotionCreateParams = {
  characterId: string;
};
type CharacterEmotionCreateBody = {
  emotionName: string | undefined;
};

// @route POST http://localhost:3500/characterEmotions/characters/:characterId
// @access Private
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

type CharacterEmotionUpdateParams = {
  characterId: string;
};
type CharacterEmotionUpdateBody = {
  emotionName: string | undefined;
};

// @route PATCH http://localhost:3500/characterEmotions/characters/:characterId
// @access Private
export const characterEmotionUpdateController: RequestHandler<
  CharacterEmotionUpdateParams,
  unknown,
  CharacterEmotionUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterEmotionUpdateService({
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

type CharacterEmotionUpdateImgUrlParams = {
  id: string;
};
type CharacterEmotionUpdateImgUrlBody = {
  imgUrl: string | undefined;
};

// @route PATCH http://localhost:3500/characterEmotions/:id/img
// @access Private
export const characterEmotionUpdateImgUrlController: RequestHandler<
  CharacterEmotionUpdateImgUrlParams,
  unknown,
  CharacterEmotionUpdateImgUrlBody,
  unknown
> = async (req, res, next) => {
  try {
    const characterEmotion = await characterEmotionUpdateImgService({
      id: req.params.id,
      imgUrl: req.body.imgUrl,
    });
    if (characterEmotion) {
      return res.status(201).json(characterEmotion);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CharacterEmotionDeleteParams = {
  characterEmotionId: string;
};

// @route DELETE http://localhost:3500/characterEmotions/:characterEmotionId
// @access Private
export const characterEmotionDeleteController: RequestHandler<
  CharacterEmotionDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterEmotionDeleteService({
      characterEmotionId: req.params.characterEmotionId,
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
