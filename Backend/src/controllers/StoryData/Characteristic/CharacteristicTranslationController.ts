import { RequestHandler } from "express";
import {
  characteristicCreateService,
  characteristicTranslationUpdateService,
  getCharacteristicByIdAndLanguageService,
  getAllCharacteristicsTranslationsByStoryIdAndLanguageService,
  getAllCharacteristicsTranslationsByCharacteristicIdAndLanguageService,
  getCharacteristicTranslationUpdatedAtAndLanguageService,
  getPaginatedTranlsationCharacteristicsService,
  getCheckCharacteristicTranslationCompletnessByStoryIdService,
} from "../../../services/StoryData/Characteristic/CharacteristicTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

// @route GET http://localhost:3500/characteristics/paginated/recent/translations
// @access Private
export const getPaginatedCharacteristicTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getCharacteristicTranslationUpdatedAtAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
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

type GetPaginatedTranlsationCharacteristicsQuery = {
  currentLanguage: string | undefined;
  storyId: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

// @route GET http://localhost:3500/characteristics/paginated/translations
// @access Private
export const getPaginatedTranlsationCharacteristicsController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetPaginatedTranlsationCharacteristicsQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getPaginatedTranlsationCharacteristicsService({
      currentLanguage: req.query.currentLanguage,
      storyId: req.query.storyId,
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

type GetCheckCharacteristicTranslationCompletnessByStoryIdParams = {
  storyId: string;
};

type GetCheckCharacteristicTranslationCompletnessByStoryIdQuery = {
  currentLanguage: string | undefined;
  translateToLanguage: string | undefined;
};

// @route GET http://localhost:3500/characteristics/stories/:storyId/completness/translations
// @access Private
export const getCheckCharacteristicTranslationCompletnessByStoryIdController: RequestHandler<
  GetCheckCharacteristicTranslationCompletnessByStoryIdParams,
  unknown,
  unknown,
  GetCheckCharacteristicTranslationCompletnessByStoryIdQuery
> = async (req, res, next) => {
  try {
    const characteristics =
      await getCheckCharacteristicTranslationCompletnessByStoryIdService({
        storyId: req.params.storyId,
        currentLanguage: req.query.currentLanguage,
        translateToLanguage: req.query.translateToLanguage,
      });
    if (typeof characteristics === "boolean") {
      return res.status(201).json(characteristics);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCharacteristicsByCharacteristicIdParams = {
  characteristicId: string;
};

type GetAllCharacteristicsByCharacteristicIdAndLanguageQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/characteristics/${characteristicId}/characterIds/translations
// @access Private
export const getAllCharacteristicsTranslationsByCharacteristicIdAndLanguageController: RequestHandler<
  GetCharacteristicsByCharacteristicIdParams,
  unknown,
  unknown,
  GetAllCharacteristicsByCharacteristicIdAndLanguageQuery
> = async (req, res, next) => {
  try {
    const characteristic =
      await getAllCharacteristicsTranslationsByCharacteristicIdAndLanguageService(
        {
          characteristicId: req.params.characteristicId,
          currentLanguage: req.query.currentLanguage,
        }
      );
    if (characteristic) {
      return res.status(201).json(characteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCharacteristicsByStoryIdParams = {
  storyId: string;
};

type GetAllCharacteristicsByLanguageQuery = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/characteristics/translations
// @access Private
export const getAllCharacteristicsTranslationsByStoryIdAndLanguageController: RequestHandler<
  GetCharacteristicsByStoryIdParams,
  unknown,
  unknown,
  GetAllCharacteristicsByLanguageQuery
> = async (req, res, next) => {
  try {
    const characteristic =
      await getAllCharacteristicsTranslationsByStoryIdAndLanguageService({
        currentLanguage: req.query.currentLanguage,
        storyId: req.params.storyId,
      });
    if (characteristic) {
      return res.status(201).json(characteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCharacteristicByIdParams = {
  characteristicId: string;
};

// @route GET http://localhost:3500/characteristics/:characteristicId/translations
// @access Private
export const characteristicGetByIdController: RequestHandler<
  GetCharacteristicByIdParams,
  unknown,
  unknown,
  GetAllCharacteristicsByLanguageQuery
> = async (req, res, next) => {
  try {
    const characteristic = await getCharacteristicByIdAndLanguageService({
      characteristicId: req.params.characteristicId,
      currentLanguage: req.query.currentLanguage,
    });
    if (characteristic) {
      return res.status(201).json(characteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CharacteristicCreateParams = {
  storyId: string;
};
type CharacteristicCreateBody = {
  text: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/characteristics/translations
// @access Private
export const characteristicCreateController: RequestHandler<
  CharacteristicCreateParams,
  unknown,
  CharacteristicCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const characteristic = await characteristicCreateService({
      currentLanguage: req.body.currentLanguage,
      text: req.body.text,
      storyId: req.params.storyId,
    });
    if (characteristic) {
      return res.status(201).json(characteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CharacteristicUpdateParams = {
  storyId: string;
  characteristicId: string;
};

type CharacteristicUpdateBody = {
  currentLanguage?: string;
  textFieldName?: string;
  storyId?: string;
  text?: string;
};

// @route PATCH http://localhost:3500/characteristics/:characteristicId/stories/:storyId/translations
// @access Private
export const characteristicTranslationUpdateController: RequestHandler<
  CharacteristicUpdateParams,
  unknown,
  CharacteristicUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const characteristic = await characteristicTranslationUpdateService({
      characteristicId: req.params.characteristicId,
      storyId: req.params.storyId,
      currentLanguage: req.body.currentLanguage,
      text: req.body.text,
      textFieldName: req.body.textFieldName,
    });
    if (characteristic) {
      return res.status(201).json(characteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
