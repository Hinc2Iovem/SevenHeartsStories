import { RequestHandler } from "express";
import {
  getChoiceOptionTranslationByCommandIdService,
  choiceOptionUpdateTranslationService,
  getAllChoiceOptionsTranslationByChoiceIdService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceOptionTranslationService";

type ChoiceOptionByChoiceOptionIdParams = {
  choiceOptionId: string;
};
type ChoiceOptionByChoiceOptionIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/choiceOptions/:choiceOptionId/translations
// @access Private
export const getChoiceOptionTranslationByCommandIdController: RequestHandler<
  ChoiceOptionByChoiceOptionIdParams,
  unknown,
  unknown,
  ChoiceOptionByChoiceOptionIdQueries
> = async (req, res, next) => {
  try {
    const choiceOption = await getChoiceOptionTranslationByCommandIdService({
      choiceOptionId: req.params.choiceOptionId,
      currentLanguage: req.query.currentLanguage,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type ChoiceOptionByChoiceIdParams = {
  choiceId: string;
};
type ChoiceOptionByChoiceIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/choiceOptions/choices/:choiceId/translations
// @access Private
export const getAllChoiceOptionsTranslationByChoiceIdController: RequestHandler<
  ChoiceOptionByChoiceIdParams,
  unknown,
  unknown,
  ChoiceOptionByChoiceIdQueries
> = async (req, res, next) => {
  try {
    const choiceOption = await getAllChoiceOptionsTranslationByChoiceIdService({
      choiceId: req.params.choiceId,
      currentLanguage: req.query.currentLanguage,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type ChoiceOptionUpdateTranslationParams = {
  choiceId: string;
  choiceOptionId: string;
};

type ChoiceOptionUpdateTranslationBody = {
  textFieldName: string | undefined;
  text: string | undefined;
  type: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/choiceOptions/:choiceOptionId/choices/:choiceId/translations
// @access Private
export const choiceOptionUpdateTranslationController: RequestHandler<
  ChoiceOptionUpdateTranslationParams,
  unknown,
  ChoiceOptionUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await choiceOptionUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      choiceId: req.params.choiceId,
      choiceOptionId: req.params.choiceOptionId,
      type: req.body.type,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
