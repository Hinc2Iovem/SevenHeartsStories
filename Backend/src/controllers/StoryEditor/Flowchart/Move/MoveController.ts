import { RequestHandler } from "express";
import {
  createMoveService,
  deleteMoveService,
} from "../../../../services/StoryEditor/Flowchart/Move/MoveService";

type CreateMoveParams = {
  flowchartCommandId: string;
};

type CreateMoveBody = {
  moveValue: number | undefined;
};

export const createMoveController: RequestHandler<
  CreateMoveParams,
  unknown,
  CreateMoveBody,
  unknown
> = async (req, res, next) => {
  try {
    const move = await createMoveService({
      moveValue: req.body.moveValue,
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
