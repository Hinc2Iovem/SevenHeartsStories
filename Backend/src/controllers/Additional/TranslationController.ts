import { RequestHandler } from "express";
import {
  addTranslationService,
  updateCurrentLanguageTranslationService,
} from "../../services/Additional/TranslationService";

type TranslationStoryDataBody = {
  currentLanguage: string | undefined;
  textFieldName: string | undefined;
  text: string | undefined;
};

// @route PUT http://localhost:3500/translations
// @access Private
export const addTranslationController: RequestHandler<
  unknown,
  unknown,
  TranslationStoryDataBody,
  unknown
> = async (req, res, next) => {
  try {
    const translationStoryData = await addTranslationService({
      currentLanguage: req.body.currentLanguage,
      textFieldName: req.body.textFieldName,
      text: req.body.text,
    });
    if (translationStoryData) {
      return res.status(201).json(translationStoryData);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type TranslationUpdateLanguageParams = {
  translationId: string;
};
type TranslationUpdateLanguageBody = {
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translation/translationId:/languages
// @access Private
export const updateCurrentLanguageTranslationController: RequestHandler<
  TranslationUpdateLanguageParams,
  unknown,
  TranslationUpdateLanguageBody,
  unknown
> = async (req, res, next) => {
  try {
    const translationStoryData = await updateCurrentLanguageTranslationService({
      translationId: req.params.translationId,
      currentLanguage: req.body.currentLanguage,
    });
    if (translationStoryData) {
      return res.status(201).json(translationStoryData);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
