import { RequestHandler } from "express";
import {
  characterCreateBlankService,
  characterCreateService,
  characterGetAllByLanguageAndStoryIdSearchService,
  characterUpdateTranslationService,
  getAllTranslationCharactersByStoryIdService,
  getCharacterTranslationByCharacterIdService,
  getCharacterTranslationUpdatedAtAndLanguageService,
} from "../../../services/StoryData/Character/CharacterTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

// @route GET http://localhost:3500/characters/recent/translations
// @access Private
export const getCharacterTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getCharacterTranslationUpdatedAtAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
      });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCharacterTranslationByCharacterIdParams = {
  characterId: string;
};
type GetCharacterTranslationByCharacterIdQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/characters/:characterId/translations
// @access Private
export const getCharacterTranslationByCharacterIdController: RequestHandler<
  GetCharacterTranslationByCharacterIdParams,
  unknown,
  unknown,
  GetCharacterTranslationByCharacterIdQuery
> = async (req, res, next) => {
  try {
    const character = await getCharacterTranslationByCharacterIdService({
      characterId: req.params.characterId,
      currentLanguage: req.query.currentLanguage,
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

type CharacterGetAllStoryIdSearchParams = {
  storyId: string;
};
type CharacterGetAllStoryIdSearchQuery = {
  currentLanguage?: string;
};

// @route GET http://localhost:3500/characters/stories/:storyId/translations
// @access Private
export const getAllTranslationCharactersByStoryIdController: RequestHandler<
  CharacterGetAllStoryIdSearchParams,
  unknown,
  unknown,
  CharacterGetAllStoryIdSearchQuery
> = async (req, res, next) => {
  try {
    const character = await getAllTranslationCharactersByStoryIdService({
      storyId: req.params.storyId,
      currentLanguage: req.query.currentLanguage,
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

type CharacterGetAllByLanguageAndStoryIdSearchQuery = {
  text?: string;
  currentLanguage?: string;
  storyId?: string;
  characterType?: string;
};
// @route GET http://localhost:3500/characters/stories/:storyId/languages/search/translations
// @access Private
export const characterGetAllByLanguageAndStoryIdSearchController: RequestHandler<
  unknown,
  unknown,
  unknown,
  CharacterGetAllByLanguageAndStoryIdSearchQuery
> = async (req, res, next) => {
  try {
    const character = await characterGetAllByLanguageAndStoryIdSearchService({
      text: req.query.text,
      currentLanguage: req.query.currentLanguage,
      storyId: req.query.storyId,
      characterType: req.query.characterType,
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

type CharacterUpdateTranslationParams = {
  characterId: string;
};

type CharacterUpdateTranslationBody = {
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/characters/:characterId/translations
// @access Private
export const characterUpdateTranslationController: RequestHandler<
  CharacterUpdateTranslationParams,
  unknown,
  CharacterUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
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
