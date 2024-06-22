import { RequestHandler } from "express";
import {
  createEffectService,
  deleteEffectService,
} from "../../../../services/StoryEditor/Flowchart/Effect/EffectService";

type CreateEffectParams = {
  flowchartCommandId: string;
};

type CreateEffectBody = {
  effectName: string | undefined;
};

export const createEffectController: RequestHandler<
  CreateEffectParams,
  unknown,
  CreateEffectBody,
  unknown
> = async (req, res, next) => {
  try {
    const effect = await createEffectService({
      effectName: req.body.effectName,
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
