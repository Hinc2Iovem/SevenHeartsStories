import { RequestHandler } from "express";
import {
  createMoveService,
  deleteMoveService,
  updateMoveService,
  getMoveByPlotFieldCommandIdService,
  createMoveDuplicateService,
} from "../../../../services/StoryEditor/PlotField/Move/MoveService";

type GetMoveByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/moves
// @access Private
export const getMoveByPlotFieldCommandIdController: RequestHandler<
  GetMoveByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const move = await getMoveByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (move) {
      return res.status(201).json(move);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateMoveDuplicateParams = {
  topologyBlockId: string;
};

type CreateMoveDuplicateBody = {
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/moves/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createMoveDuplicateController: RequestHandler<
  CreateMoveDuplicateParams,
  unknown,
  CreateMoveDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const move = await createMoveDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      commandOrder: req.body.commandOrder,
    });
    if (move) {
      return res.status(201).json(move);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateMoveParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/moves
// @access Private
export const createMoveController: RequestHandler<
  CreateMoveParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const move = await createMoveService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (move) {
      return res.status(201).json(move);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateMoveParams = {
  moveId: string;
};

type UpdateMoveBody = {
  moveValue: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/moves/:moveId
// @access Private
export const updateMoveController: RequestHandler<
  UpdateMoveParams,
  unknown,
  UpdateMoveBody,
  unknown
> = async (req, res, next) => {
  try {
    const move = await updateMoveService({
      moveValue: req.body.moveValue,
      moveId: req.params.moveId,
    });
    if (move) {
      return res.status(201).json(move);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteMoveParams = {
  moveId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/moves/:moveId
// @access Private
export const deleteMoveController: RequestHandler<
  DeleteMoveParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const move = await deleteMoveService({
      moveId: req.params.moveId,
    });
    if (move) {
      return res.status(201).json(move);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
