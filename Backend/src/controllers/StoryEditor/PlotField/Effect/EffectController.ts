import { RequestHandler } from "express";
import {
  createEffectService,
  deleteEffectService,
  getEffectByPlotFieldCommandIdService,
  updateEffectService,
} from "../../../../services/StoryEditor/PlotField/Effect/EffectService";

type GetEffectByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/effects
// @access Private
export const getEffectByPlotFieldCommandIdController: RequestHandler<
  GetEffectByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const effect = await getEffectByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (effect) {
      return res.status(201).json(effect);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateEffectParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/effects
// @access Private
export const createEffectController: RequestHandler<
  CreateEffectParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const effect = await createEffectService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (effect) {
      return res.status(201).json(effect);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateEffectParams = {
  effectId: string;
};

type UpdateEffectBody = {
  effectName: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/effects/:effectId
// @access Private
export const updateEffectController: RequestHandler<
  UpdateEffectParams,
  unknown,
  UpdateEffectBody,
  unknown
> = async (req, res, next) => {
  try {
    const effect = await updateEffectService({
      effectName: req.body.effectName,
      effectId: req.params.effectId,
    });
    if (effect) {
      return res.status(201).json(effect);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteEffectParams = {
  effectId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/effects/:effectId
// @access Private
export const deleteEffectController: RequestHandler<
  DeleteEffectParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const effect = await deleteEffectService({
      effectId: req.params.effectId,
    });
    if (effect) {
      return res.status(201).json(effect);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
