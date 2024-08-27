import { RequestHandler } from "express";
import {
  characterDeleteService,
  characterGetAllByStoryIdAndTypeService,
  characterGetAllByStoryIdService,
  characterUpdateImgService,
  characterUpdateService,
  getAllCharacterNameTagsService,
  getSingleCharacterByIdService,
} from "../../../services/StoryData/Character/CharacterService";

type GetSingleCharacterByIdParams = {
  characterId: string;
};

// @route GET http://localhost:3500/characters/:characterId
// @access Private
export const getSingleCharacterByIdController: RequestHandler<
  GetSingleCharacterByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await getSingleCharacterByIdService({
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

type GetAllCharacterNameTagsParams = {
  storyId: string;
};

// @route GET http://localhost:3500/characters/stories/:storyId/nameTag
// @access Private
export const getAllCharacterNameTagsController: RequestHandler<
  GetAllCharacterNameTagsParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await getAllCharacterNameTagsService({
      storyId: req.params.storyId,
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

type CharacterGetAllByStoryIdAndTypeParams = {
  storyId: string;
};

export type AllPossibleCharacterTypes =
  | "all"
  | "maincharacter"
  | "minorcharacter"
  | "emptycharacter";

type CharacterGetAllByStoryIdAndTypeQuery = {
  type: AllPossibleCharacterTypes;
};
// @route GET http://localhost:3500/characters/stories/:storyId/type
// @access Private
export const characterGetAllByStoryIdAndTypeController: RequestHandler<
  CharacterGetAllByStoryIdAndTypeParams,
  unknown,
  unknown,
  CharacterGetAllByStoryIdAndTypeQuery
> = async (req, res, next) => {
  try {
    const character = await characterGetAllByStoryIdAndTypeService({
      storyId: req.params.storyId,
      type: req.query.type,
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

type CharacterGetAllByStoryIdParams = {
  storyId: string;
};
// @route GET http://localhost:3500/characters/stories/:storyId
// @access Private
export const characterGetAllByStoryIdController: RequestHandler<
  CharacterGetAllByStoryIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterGetAllByStoryIdService({
      storyId: req.params.storyId,
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
  nameTag: string | undefined;
  type: string | undefined;
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

type CharacterUpdateImgParams = {
  characterId: string;
};

type CharacterUpdateImgBody = {
  imgUrl: string | undefined;
};

// @route PATCH http://localhost:3500/characters/:characterId/img
// @access Private
export const characterUpdateImgController: RequestHandler<
  CharacterUpdateImgParams,
  unknown,
  CharacterUpdateImgBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterUpdateImgService({
      imgUrl: req.body.imgUrl,
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
