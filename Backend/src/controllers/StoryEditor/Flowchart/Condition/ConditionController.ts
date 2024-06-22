import { RequestHandler } from "express";
import {
  addAnotherBlockConditionService,
  createConditionService,
  deleteConditionService,
} from "../../../../services/StoryEditor/Flowchart/Condition/ConditionService";

type CreateConditionParams = {
  flowchartCommandId: string;
  targetBlockId: string;
};

export const createConditionController: RequestHandler<
  CreateConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await createConditionService({
      flowchartCommandId: req.params.flowchartCommandId,
      targetBlockId: req.params.targetBlockId,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

export const addAnotherBlockConditionController: RequestHandler<
  CreateConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await addAnotherBlockConditionService({
      flowchartCommandId: req.params.flowchartCommandId,
      targetBlockId: req.params.targetBlockId,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteConditionParams = {
  conditionId: string;
};

export const deleteConditionController: RequestHandler<
  DeleteConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await deleteConditionService({
      conditionId: req.params.conditionId,
    });
    if (condition) {
      return res.status(201).json(condition);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
