import { RequestHandler } from "express";
import {
  createMoveService,
  deleteMoveService,
  updateMoveService,
} from "../../../../services/StoryEditor/Flowchart/Move/MoveService";

type CreateMoveParams = {
  flowchartCommandId: string;
};

export const createMoveController: RequestHandler<
  CreateMoveParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const move = await createMoveService({
      flowchartCommandId: req.params.flowchartCommandId,
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
  moveValue: number | undefined;
};

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
