import { RequestHandler } from "express";
import {
  createWaitService,
  deleteWaitService,
  getWaitByPlotFieldCommandIdService,
  updateWaitService,
} from "../../../../services/StoryEditor/PlotField/Wait/WaitService";

type GetWaitByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/waits
// @access Private
export const getWaitByPlotFieldCommandIdController: RequestHandler<
  GetWaitByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const wait = await getWaitByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (wait) {
      return res.status(201).json(wait);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateWaitParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/wait
// @access Private
export const createWaitController: RequestHandler<
  CreateWaitParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const wait = await createWaitService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (wait) {
      return res.status(201).json(wait);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateWaitParams = {
  waitId: string;
};

type UpdateWaitBody = {
  waitValue: number | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/wait/:waitId
// @access Private
export const updateWaitController: RequestHandler<
  UpdateWaitParams,
  unknown,
  UpdateWaitBody,
  unknown
> = async (req, res, next) => {
  try {
    const wait = await updateWaitService({
      waitValue: req.body.waitValue,
      waitId: req.params.waitId,
    });
    if (wait) {
      return res.status(201).json(wait);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteWaitParams = {
  waitId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/wait/:waitId
// @access Private
export const deleteWaitController: RequestHandler<
  DeleteWaitParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const wait = await deleteWaitService({
      waitId: req.params.waitId,
    });
    if (wait) {
      return res.status(201).json(wait);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
