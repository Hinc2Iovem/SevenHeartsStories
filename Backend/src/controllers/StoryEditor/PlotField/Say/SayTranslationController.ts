import { RequestHandler } from "express";
import {
  createSayTranslationService,
  getAllSayTranslationByTopologyBlockIdService,
  sayTranslationByCommandIdService,
  sayUpdateTranslationService,
} from "../../../../services/StoryEditor/PlotField/Say/SayTranslationService";
import { SayType } from "./SayController";

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
