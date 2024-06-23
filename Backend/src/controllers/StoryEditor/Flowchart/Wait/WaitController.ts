import { RequestHandler } from "express";
import {
  createWaitService,
  deleteWaitService,
  updateWaitService,
} from "../../../../services/StoryEditor/Flowchart/Wait/WaitService";

type CreateWaitParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/wait
// @access Private
export const createWaitController: RequestHandler<
  CreateWaitParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const wait = await createWaitService({
      flowchartCommandId: req.params.flowchartCommandId,
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

// @route PATCH http://localhost:3500/flowchartCommands/wait/:waitId
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

// @route POST http://localhost:3500/flowchartCommands/wait/:waitId
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
