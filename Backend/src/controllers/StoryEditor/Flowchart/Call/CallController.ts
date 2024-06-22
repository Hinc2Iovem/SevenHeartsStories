import { RequestHandler } from "express";
import {
  createCallService,
  deleteCallService,
  updateCallService,
} from "../../../../services/StoryEditor/Flowchart/Call/CallService";

type CreateCallParams = {
  flowchartCommandId: string;
  targetBlockId: string;
};

export const createCallController: RequestHandler<
  CreateCallParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await createCallService({
      flowchartCommandId: req.params.flowchartCommandId,
      targetBlockId: req.params.targetBlockId,
    });
    if (call) {
      return res.status(201).json(call);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateCallParams = {
  callId: string;
  newTargetBlockId: string;
};

export const updateCallController: RequestHandler<
  UpdateCallParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await updateCallService({
      newTargetBlockId: req.params.newTargetBlockId,
      callId: req.params.callId,
    });
    if (call) {
      return res.status(201).json(call);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteCallParams = {
  callId: string;
};

export const deleteCallController: RequestHandler<
  DeleteCallParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await deleteCallService({
      callId: req.params.callId,
    });
    if (call) {
      return res.status(201).json(call);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
