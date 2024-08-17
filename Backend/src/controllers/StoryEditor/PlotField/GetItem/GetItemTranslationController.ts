import { RequestHandler } from "express";
import {
  createGetItemTranslationService,
  getAllItemTranslationByTopologyBlockIdService,
  getItemTranslationByCommandIdService,
  getItemUpdateTranslationService,
} from "../../../../services/StoryEditor/PlotField/GetItem/GetItemTranslationService";

type GetItemByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};
type GetItemByPlotFieldCommandIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/getItems/:plotFieldCommandId/translations
// @access Private
export const getItemTranslationByCommandIdController: RequestHandler<
  GetItemByPlotFieldCommandIdParams,
  unknown,
  unknown,
  GetItemByPlotFieldCommandIdQueries
> = async (req, res, next) => {
  try {
    const getItem = await getItemTranslationByCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      currentLanguage: req.query.currentLanguage,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetItemByTopologyBlockIdParams = {
  topologyBlockId: string;
};
type GetItemByTopologyBlockIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/getItems/topologyBlocks/:topologyBlockId/translations
// @access Private
export const getAllItemTranslationByTopologyBlockIdController: RequestHandler<
  GetItemByTopologyBlockIdParams,
  unknown,
  unknown,
  GetItemByTopologyBlockIdQueries
> = async (req, res, next) => {
  try {
    const getItem = await getAllItemTranslationByTopologyBlockIdService({
      topologyBlockId: req.params.topologyBlockId,
      currentLanguage: req.query.currentLanguage,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateGetItemParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

// @route POST http://localhost:3500/getItems/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const createGetItemTranslationController: RequestHandler<
  CreateGetItemParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await createGetItemTranslationService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetItemUpdateTranslationParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type GetItemUpdateTranslationBody = {
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/getItems/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const getItemUpdateTranslationController: RequestHandler<
  GetItemUpdateTranslationParams,
  unknown,
  GetItemUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await getItemUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
