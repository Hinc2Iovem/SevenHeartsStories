import { RequestHandler } from "express";
import {
  characterCreateBlankService,
  characterCreateService,
  characterDeleteService,
  characterGetAllByStoryIdAndTypeService,
  characterGetAllByStoryIdService,
  characterGetByStoryIdAndNameService,
  characterUpdateImgService,
  characterUpdateService,
  getAllCharacterNameTagsService,
  getSingleCharacterByIdService,
} from "../../services/StoryData/CharacterService";

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

type CharacterGetByStoryIdAndNameParams = {
  storyId: string;
};
type CharacterGetByStoryIdAndNameBody = {
  name: string | undefined;
};

// @route GET http://localhost:3500/characters/stories/:storyId/name
// @access Private
export const characterGetByStoryIdAndNameController: RequestHandler<
  CharacterGetByStoryIdAndNameParams,
  unknown,
  CharacterGetByStoryIdAndNameBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterGetByStoryIdAndNameService({
      storyId: req.params.storyId,
      name: req.body.name,
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

type CharacterCreateParams = {
  storyId: string;
};

export type CharacterTypeAlias =
  | "EmptyCharacter"
  | "MinorCharacter"
  | "MainCharacter";

type CharacterCreateBody = {
  name: string | undefined;
  currentLanguage: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
};

// @route POST http://localhost:3500/characters/stories/:storyId
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
      currentLanguage: req.body.currentLanguage,
      unknownName: req.body.unknownName,
      description: req.body.description,
      nameTag: req.body.nameTag,
      type: req.body.type,
      img: req.body.img,
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

type CharacterCreateBlankParams = {
  storyId: string;
};

type CharacterCreateBlankBody = {
  name: string | undefined;
  currentLanguage: string | undefined;
  type: CharacterTypeAlias | undefined;
};

// @route POST http://localhost:3500/characters/stories/:storyId/blank
// @access Private
export const characterCreateBlankController: RequestHandler<
  CharacterCreateBlankParams,
  unknown,
  CharacterCreateBlankBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterCreateBlankService({
      storyId: req.params.storyId,
      name: req.body.name,
      currentLanguage: req.body.currentLanguage,
      type: req.body.type,
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
