import { RequestHandler } from "express";
import {
  commandWardrobeTranslationByCommandIdService,
  commandWardrobeUpdateTranslationService,
  createCommandWardrobeTranslationService,
  getAllCommandWardrobesTranslationByTopologyBlockIdService,
} from "../../../../services/StoryEditor/PlotField/Wardrobe/CommandWardrobeTranslationService";

type CommandWardrobeByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};
type CommandWardrobeByPlotFieldCommandIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/commandWardrobes/:plotFieldCommandId/translations
// @access Private
export const commandWardrobeTranslationByCommandIdController: RequestHandler<
  CommandWardrobeByPlotFieldCommandIdParams,
  unknown,
  unknown,
  CommandWardrobeByPlotFieldCommandIdQueries
> = async (req, res, next) => {
  try {
    const commandWardrobe = await commandWardrobeTranslationByCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      currentLanguage: req.query.currentLanguage,
    });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CommandWardrobeByTopologyBlockIdParams = {
  topologyBlockId: string;
};
type CommandWardrobeByTopologyBlockIdQueries = {
  currentLanguage: string;
};

// @route GET http://localhost:3500/commandWardrobes/topologyBlocks/:topologyBlockId/translations
// @access Private
export const getAllCommandWardrobesTranslationByTopologyBlockIdController: RequestHandler<
  CommandWardrobeByTopologyBlockIdParams,
  unknown,
  unknown,
  CommandWardrobeByTopologyBlockIdQueries
> = async (req, res, next) => {
  try {
    const commandWardrobe =
      await getAllCommandWardrobesTranslationByTopologyBlockIdService({
        topologyBlockId: req.params.topologyBlockId,
        currentLanguage: req.query.currentLanguage,
      });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateCommandWardrobeParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

// @route POST http://localhost:3500/commandWardrobes/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const createCommandWardrobeTranslationController: RequestHandler<
  CreateCommandWardrobeParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await createCommandWardrobeTranslationService({
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CommandWardrobeUpdateTranslationParams = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

type CommandWardrobeUpdateTranslationBody = {
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

// @route PATCH http://localhost:3500/commandWardrobes/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations
// @access Private
export const commandWardrobeUpdateTranslationController: RequestHandler<
  CommandWardrobeUpdateTranslationParams,
  unknown,
  CommandWardrobeUpdateTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await commandWardrobeUpdateTranslationService({
      text: req.body.text,
      textFieldName: req.body.textFieldName,
      currentLanguage: req.body.currentLanguage,
      plotFieldCommandId: req.params.plotFieldCommandId,
      topologyBlockId: req.params.topologyBlockId,
    });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
