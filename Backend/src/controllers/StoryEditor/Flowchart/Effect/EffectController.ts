import { RequestHandler } from "express";
import {
  createEffectService,
  deleteEffectService,
  updateEffectService,
} from "../../../../services/StoryEditor/Flowchart/Effect/EffectService";

type CreateEffectParams = {
  flowchartCommandId: string;
};

export const createEffectController: RequestHandler<
  CreateEffectParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const effect = await createEffectService({
      flowchartCommandId: req.params.flowchartCommandId,
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
