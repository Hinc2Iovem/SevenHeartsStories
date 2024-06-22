import { RequestHandler } from "express";
import {
  createWaitService,
  deleteWaitService,
} from "../../../../services/StoryEditor/Flowchart/Wait/WaitService";

type CreateWaitParams = {
  flowchartCommandId: string;
};

type CreateWaitBody = {
  waitValue: number | undefined;
};

export const createWaitController: RequestHandler<
  CreateWaitParams,
  unknown,
  CreateWaitBody,
  unknown
> = async (req, res, next) => {
  try {
    const wait = await createWaitService({
      waitValue: req.body.waitValue,
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

type DeleteWaitParams = {
  waitId: string;
};

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
