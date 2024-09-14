import { RequestHandler } from "express";
import {
  createSayTranslationDuplicateService,
  createSayTranslationService,
  getAllSayTranslationByTopologyBlockIdService,
  getSayTranslationUpdatedAtAndLanguageService,
  sayTranslationByCommandIdService,
  sayUpdateTranslationService,
} from "../../../../services/StoryEditor/PlotField/Say/SayTranslationService";
import { SayType } from "./SayController";

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

// @route GET http://localhost:3500/says/recent/translations
// @access Private
export const getSayTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getSayTranslationUpdatedAtAndLanguageService({
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

type SayByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};
type SayByPlotFieldCommandIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/says/:plotFieldCommandId/translations
// @access Private
export const sayTranslationByCommandIdController: RequestHandler<
  SayByPlotFieldCommandIdParams,
  unknown,
  unknown,
  SayByPlotFieldCommandIdQueries
> = async (req, res, next) => {
  try {
    const say = await sayTranslationByCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      currentLanguage: req.query.currentLanguage,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type SayByTopologyBlockIdParams = {
  topologyBlockId: string;
};
type SayByTopologyBlockIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/says/topologyBlocks/:topologyBlockId/translations
// @access Private
export const getAllSayTranslationByTopologyBlockIdController: RequestHandler<
  SayByTopologyBlockIdParams,
  unknown,
  unknown,
  SayByTopologyBlockIdQueries
> = async (req, res, next) => {
  try {
    const say = await getAllSayTranslationByTopologyBlockIdService({
      topologyBlockId: req.params.topologyBlockId,
      currentLanguage: req.query.currentLanguage,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateSayParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type CreateSayBody = {
  characterId: string;
  type?: SayType | undefined;
};

// @route POST http://localhost:3500/says/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const createSayTranslationController: RequestHandler<
  CreateSayParams,
  unknown,
  CreateSayBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await createSayTranslationService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
      characterId: req.body.characterId,
      type: req.body.type,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateSayDuplicateParams = {
  topologyBlockId: string;
};

type CreateSayDuplicateBody = {
  characterId?: string;
  characterEmotionId?: string;
  type?: SayType;
  commandOrder?: number;
  commandSide?: string;
};

// @route POST http://localhost:3500/says/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const createSayTranslationDuplicateController: RequestHandler<
  CreateSayDuplicateParams,
  unknown,
  CreateSayDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await createSayTranslationDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      characterId: req.body.characterId,
      type: req.body.type,
      commandOrder: req.body.commandOrder,
      characterEmotionId: req.body.characterEmotionId,
      commandSide: req.body.commandSide,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type SayUpdateTranslationParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type SayUpdateTranslationBody = {
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/says/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const sayUpdateTranslationController: RequestHandler<
  SayUpdateTranslationParams,
  unknown,
  SayUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await sayUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
