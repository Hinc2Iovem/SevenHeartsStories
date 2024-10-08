import { RequestHandler } from "express";
import {
  createChoiceTranslationService,
  getAllChoicesTranslationByTopologyBlockIdService,
  getChoiceTranslationByCommandIdService,
  choiceUpdateTranslationService,
  getChoiceTranslationUpdatedAtAndLanguageService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceTranslationService";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

// @route GET http://localhost:3500/choices/paginated/recent/translations
// @access Private
export const getChoiceTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getChoiceTranslationUpdatedAtAndLanguageService(
      {
        currentLanguage: req.query.currentLanguage,
        updatedAt: req.query.updatedAt,
        page: req.query.page,
        limit: req.query.limit,
      }
    );
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type ChoiceByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};
type ChoiceByPlotFieldCommandIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/choices/:plotFieldCommandId/translations
// @access Private
export const getChoiceTranslationByCommandIdController: RequestHandler<
  ChoiceByPlotFieldCommandIdParams,
  unknown,
  unknown,
  ChoiceByPlotFieldCommandIdQueries
> = async (req, res, next) => {
  try {
    const choice = await getChoiceTranslationByCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      currentLanguage: req.query.currentLanguage,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type ChoiceByTopologyBlockIdParams = {
  topologyBlockId: string;
};
type ChoiceByTopologyBlockIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/choices/topologyBlocks/:topologyBlockId/translations
// @access Private
export const getAllChoicesTranslationByTopologyBlockIdController: RequestHandler<
  ChoiceByTopologyBlockIdParams,
  unknown,
  unknown,
  ChoiceByTopologyBlockIdQueries
> = async (req, res, next) => {
  try {
    const choice = await getAllChoicesTranslationByTopologyBlockIdService({
      topologyBlockId: req.params.topologyBlockId,
      currentLanguage: req.query.currentLanguage,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateChoiceParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

// @route POST http://localhost:3500/choices/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const createChoiceTranslationController: RequestHandler<
  CreateChoiceParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await createChoiceTranslationService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type ChoiceUpdateTranslationParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type ChoiceUpdateTranslationBody = {
  textFieldName: string;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/choices/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const choiceUpdateTranslationController: RequestHandler<
  ChoiceUpdateTranslationParams,
  unknown,
  ChoiceUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await choiceUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
