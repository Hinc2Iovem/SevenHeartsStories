import { RequestHandler } from "express";
import {
  appearancePartTranslationByAppearancePartIdService,
  appearancePartUpdateTranslationService,
  createAppearancePartTranslationService,
  getAllAppearancePartsTranslationByCharacterIdAndTypeService,
  getAllAppearancePartsTranslationByCharacterIdService,
} from "../../../services/StoryData/AppearancePart/AppearancePartTranslationService";
import { AppearancePartsTypes } from "../../../consts/APPEARANCE_PARTS";

type AppearancePartByAppearancePartIdParams = {
  appearancePartId: string;
};
type AppearancePartByAppearancePartIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/appearanceParts/:appearancePartId/translations
// @access Private
export const appearancePartTranslationByAppearancePartIdController: RequestHandler<
  AppearancePartByAppearancePartIdParams,
  unknown,
  unknown,
  AppearancePartByAppearancePartIdQueries
> = async (req, res, next) => {
  try {
    const appearancePart =
      await appearancePartTranslationByAppearancePartIdService({
        appearancePartId: req.params.appearancePartId,
        currentLanguage: req.query.currentLanguage,
      });
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type AppearancePartByCharacterIdAndTypeParams = {
  characterId: string;
};
type AppearancePartByCharacterIdAndTypeQueries = {
  currentLanguage: string;
  type: AppearancePartsTypes;
};

// @route GET http://localhost:3500/appearanceParts/characters/:characterId/types/translations
// @access Private
export const getAllAppearancePartsTranslationByCharacterIdAndTypeController: RequestHandler<
  AppearancePartByCharacterIdAndTypeParams,
  unknown,
  unknown,
  AppearancePartByCharacterIdAndTypeQueries
> = async (req, res, next) => {
  try {
    const appearancePart =
      await getAllAppearancePartsTranslationByCharacterIdAndTypeService({
        characterId: req.params.characterId,
        currentLanguage: req.query.currentLanguage,
        type: req.query.type,
      });
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type AppearancePartByCharacterIdParams = {
  characterId: string;
};
type AppearancePartByCharacterIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/appearanceParts/characters/:characterId/translations
// @access Private
export const getAllAppearancePartsTranslationByCharacterIdController: RequestHandler<
  AppearancePartByCharacterIdParams,
  unknown,
  unknown,
  AppearancePartByCharacterIdQueries
> = async (req, res, next) => {
  try {
    const appearancePart =
      await getAllAppearancePartsTranslationByCharacterIdService({
        characterId: req.params.characterId,
        currentLanguage: req.query.currentLanguage,
      });
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateAppearancePartParams = {
  characterId: string;
};

type CreateAppearancePartBody = {
  type: AppearancePartsTypes;
};

// @route POST http://localhost:3500/appearanceParts/characters/:characterId/translations
// @access Private
export const createAppearancePartTranslationController: RequestHandler<
  CreateAppearancePartParams,
  unknown,
  CreateAppearancePartBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await createAppearancePartTranslationService({
      characterId: req.params.characterId,
      type: req.body.type,
    });
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type AppearancePartUpdateTranslationParams = {
  appearancePartId: string;
  characterId: string;
};

type AppearancePartUpdateTranslationBody = {
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/appearanceParts/:appearancePartId/characters/:characterId/translations
// @access Private
export const appearancePartUpdateTranslationController: RequestHandler<
  AppearancePartUpdateTranslationParams,
  unknown,
  AppearancePartUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      appearancePartId: req.params.appearancePartId,
      characterId: req.params.characterId,
    });
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
