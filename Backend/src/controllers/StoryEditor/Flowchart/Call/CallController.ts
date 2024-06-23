import { RequestHandler } from "express";
import {
  createCallService,
  deleteCallService,
  updateCallService,
  updateCallTargetBlockIdService,
} from "../../../../services/StoryEditor/Flowchart/Call/CallService";

type CreateCallParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/calls
// @access Private
export const createCallController: RequestHandler<
  CreateCallParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await createCallService({
      flowchartCommandId: req.params.flowchartCommandId,
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
  targetBlockId: string;
};

// @route PATCH http://localhost:3500/flowchartCommands/calls/:callId/targetBlocks/:targetBlockId
// @access Private
export const updateCallController: RequestHandler<
  UpdateCallParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await updateCallService({
      callId: req.params.callId,
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

type UpdateCallTargetBlockParams = {
  callId: string;
  newTargetBlockId: string;
};

// @route PATCH http://localhost:3500/flowchartCommands/calls/:callId/targetBlocks/:newTargetBlockId/assingNewBlock
// @access Private
export const updateCallTargetBlockIdController: RequestHandler<
  UpdateCallTargetBlockParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await updateCallTargetBlockIdService({
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

// @route DELETE http://localhost:3500/flowchartCommands/calls/:callId/targetBlocks
// @access Private
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
