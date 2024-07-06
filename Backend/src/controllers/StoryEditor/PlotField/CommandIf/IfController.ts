import { RequestHandler } from "express";
import {
  addAnotherBlockIfService,
  createIfService,
  deleteIfService,
  getIfByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/ServiceIf/IfService";

type GetConditionByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifs
// @access Private
export const getConditionByPlotFieldCommandIdController: RequestHandler<
  GetConditionByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await getIfByPlotFieldCommandIdService({
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
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifs
// @access Private
export const createConditionController: RequestHandler<
  CreateConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await createIfService({
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

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifs/addCondititon
// @access Private
export const addAnotherBlockConditionController: RequestHandler<
  CreateConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await addAnotherBlockIfService({
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

type DeleteConditionParams = {
  ifId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/ifs/:ifId
// @access Private
export const deleteConditionController: RequestHandler<
  DeleteConditionParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const condition = await deleteIfService({
      ifId: req.params.ifId,
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
