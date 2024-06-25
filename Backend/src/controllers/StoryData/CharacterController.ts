import { RequestHandler } from "express";
import {
  characterCreateService,
  characterDeleteService,
  characterUpdateImgService,
  characterUpdateNameTagService,
  characterUpdateService,
} from "../../services/StoryData/CharacterService";

type CharacterCreateParams = {
  storyId: string;
};

export type CharacterTypeAlias = "common" | "special";

type CharacterCreateBody = {
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
  isMainCharacter: boolean | undefined;
};

// @route POST http://localhost:3500/characters
// @access Private
export const characterCreateController: RequestHandler<
  CharacterCreateParams,
  unknown,
  CharacterCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterCreateService({
      storyId: req.params.storyId,
      name: req.body.name,
      unknownName: req.body.unknownName,
      description: req.body.description,
      nameTag: req.body.nameTag,
      type: req.body.type,
      img: req.body.img,
      isMainCharacter: req.body.isMainCharacter,
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

type CharacterUpdateParams = {
  characterId: string;
};

type CharacterUpdateBody = {
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
};

// @route PATCH http://localhost:3500/characters/:characterId
// @access Private
export const characterUpdateController: RequestHandler<
  CharacterUpdateParams,
  unknown,
  CharacterUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterUpdateService({
      name: req.body.name,
      unknownName: req.body.unknownName,
      description: req.body.description,
      nameTag: req.body.nameTag,
      type: req.body.type,
      img: req.body.img,
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

type CharacterUpdateNameTagBody = {
  nameTag: string | undefined;
};

// @route PATCH http://localhost:3500/characters/:characterId/nameTag
// @access Private
export const characterUpdateNameTagController: RequestHandler<
  CharacterUpdateParams,
  unknown,
  CharacterUpdateNameTagBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterUpdateNameTagService({
      nameTag: req.body.nameTag,
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

type CharacterUpdateImgBody = {
  img: string | undefined;
};

// @route PATCH http://localhost:3500/characters/:characterId/img
// @access Private
export const characterUpdateImgController: RequestHandler<
  CharacterUpdateParams,
  unknown,
  CharacterUpdateImgBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterUpdateImgService({
      img: req.body.img,
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

type CharacterDeleteParams = {
  characterId: string;
};

// @route DELETE http://localhost:3500/character/:characterId
// @access Private
export const characterDeleteController: RequestHandler<
  CharacterDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterDeleteService({
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
