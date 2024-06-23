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

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/conditions/targetBlocks/:targetBlockId
// @access Private
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

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/conditions/targetBlock/:targetBlockId/addBlock
// @access Private
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

// @route DELETE http://localhost:3500/flowchartCommands/conditions/:conditionId
// @access Private
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
