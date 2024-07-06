import { RequestHandler } from "express";
import {
  createCallService,
  deleteCallService,
  getCallByPlotFieldCommandIdService,
  updateCallService,
} from "../../../../services/StoryEditor/PlotField/Call/CallService";

type GetCallByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/calls
// @access Private
export const getCallByPlotFieldCommandIdController: RequestHandler<
  GetCallByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await getCallByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateCallParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/calls
// @access Private
export const createCallController: RequestHandler<
  CreateCallParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const call = await createCallService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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
  sourceBlockId: string;
};

// @route PATCH http://localhost:3500/plotFieldCommands/calls/:callId/targetBlocks/:targetBlockId/sourceBlocks/:sourceBlockId
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
      sourceBlockId: req.params.sourceBlockId,
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

// type UpdateCallTargetBlockParams = {
//   callId: string;
//   newTargetBlockId: string;
// };

// // @route PATCH http://localhost:3500/plotFieldCommands/calls/:callId/targetBlocks/:newTargetBlockId/assingNewBlock
// // @access Private
// export const updateCallTargetBlockIdController: RequestHandler<
//   UpdateCallTargetBlockParams,
//   unknown,
//   unknown,
//   unknown
// > = async (req, res, next) => {
//   try {
//     const call = await updateCallTargetBlockIdService({
//       newTargetBlockId: req.params.newTargetBlockId,
//       callId: req.params.callId,
//     });
//     if (call) {
//       return res.status(201).json(call);
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

type DeleteCallParams = {
  callId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/calls/:callId
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
