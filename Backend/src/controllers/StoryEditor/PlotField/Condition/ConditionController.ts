import { RequestHandler } from "express";
import {
  addAnotherBlockConditionService,
  createConditionService,
  deleteConditionService,
  getConditionByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/Condition/ConditionService";

type GetConditionByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/conditions
// @access Private
export const getConditionByPlotFieldCommandIdController: RequestHandler<
  GetConditionByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await getConditionByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateConditionParams = {
  plotFieldCommandId: string;
  targetBlockId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/conditions/targetBlocks/:targetBlockId
// @access Private
export const createConditionController: RequestHandler<
  CreateConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await createConditionService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/conditions/targetBlock/:targetBlockId/addBlock
// @access Private
export const addAnotherBlockConditionController: RequestHandler<
  CreateConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await addAnotherBlockConditionService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

// @route DELETE http://localhost:3500/plotFieldCommands/conditions/:conditionId
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
