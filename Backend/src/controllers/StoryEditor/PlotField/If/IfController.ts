import { RequestHandler } from "express";
import {
  addAnotherBlockIfService,
  createIfService,
  deleteIfService,
  getIfByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/ServiceIf/IfService";

type GetIfByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifcommands
// @access Private
export const getIfByPlotFieldCommandIdController: RequestHandler<
  GetIfByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifcommand = await getIfByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (ifcommand) {
      return res.status(201).json(ifcommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateIfParams = {
  plotFieldCommandId: string;
  targetBlockId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifcommands
// @access Private
export const createIfController: RequestHandler<
  CreateIfParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifcommand = await createIfService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (ifcommand) {
      return res.status(201).json(ifcommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/ifcommands
// @access Private
export const addAnotherBlockIfController: RequestHandler<
  CreateIfParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifcommand = await addAnotherBlockIfService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (ifcommand) {
      return res.status(201).json(ifcommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteIfParams = {
  ifId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/ifcommands/:ifId
// @access Private
export const deleteIfController: RequestHandler<
  DeleteIfParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ifcommand = await deleteIfService({
      ifId: req.params.ifId,
    });
    if (ifcommand) {
      return res.status(201).json(ifcommand);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
