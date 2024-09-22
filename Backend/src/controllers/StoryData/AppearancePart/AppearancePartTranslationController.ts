import { RequestHandler } from "express";
import {
  appearancePartTranslationByAppearancePartIdService,
  appearancePartUpdateTranslationService,
  createAppearancePartTranslationService,
  getAllAppearancePartsTranslationByCharacterIdAndTypeService,
  getAllAppearancePartsTranslationByCharacterIdService,
  getPaginatedAppearancePartTranslationUpdatedAtAndLanguageService,
  getPaginatedTranlsationAppearancePartsService,
} from "../../../services/StoryData/AppearancePart/AppearancePartTranslationService";
import { AppearancePartsTypes } from "../../../consts/APPEARANCE_PARTS";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/appearanceParts/paginated/recent/translations
// @access Private
export const getPaginatedAppearancePartTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getPaginatedAppearancePartTranslationUpdatedAtAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
        limit: req.query.limit,
        page: req.query.page,
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

type GetPaginatedTranlsationAppearancePartsQuery = {
  currentLanguage: string | undefined;
  characterId: string | undefined;
  limit: number | undefined;
  page: number | undefined;
  type: string | undefined;
};

// @route GET http://localhost:3500/appearanceParts/paginated/translations
// @access Private
export const getPaginatedTranlsationAppearancePartsController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetPaginatedTranlsationAppearancePartsQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getPaginatedTranlsationAppearancePartsService({
      currentLanguage: req.query.currentLanguage,
      characterId: req.query.characterId,
      type: req.query.type,
      page: req.query.page,
      limit: req.query.limit,
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
  type?: AppearancePartsTypes;
  appearancePartName?: string;
  currentLanguage?: string;
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
      appearancePartName: req.body.appearancePartName,
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
  textFieldName: string;
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
      appearancePartId: req.params.appearancePartId,
      characterId: req.params.characterId,
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
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
