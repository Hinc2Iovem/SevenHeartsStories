import { RequestHandler } from "express";
import {
  createSuitService,
  deleteSuitService,
  updateSuitService,
} from "../../../../services/StoryEditor/Flowchart/Suit/SuitService.ts";

type CreateSuitParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/suits
// @access Private
export const createSuitController: RequestHandler<
  CreateSuitParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const suit = await createSuitService({
      flowchartCommandId: req.params.flowchartCommandId,
    });
    if (suit) {
      return res.status(201).json(suit);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateSuitParams = {
  suitId: string;
};

type UpdateSuitBody = {
  suitName: string | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/suits/:suitId
// @access Private
export const updateSuitController: RequestHandler<
  UpdateSuitParams,
  unknown,
  UpdateSuitBody,
  unknown
> = async (req, res, next) => {
  try {
    const suit = await updateSuitService({
      suitName: req.body.suitName,
      suitId: req.params.suitId,
    });
    if (suit) {
      return res.status(201).json(suit);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteSuitParams = {
  suitId: string;
};

// @route DELETE http://localhost:3500/flowchartCommands/suits/:suitId
// @access Private
export const deleteSuitController: RequestHandler<
  DeleteSuitParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const suit = await deleteSuitService({
      suitId: req.params.suitId,
    });
    if (suit) {
      return res.status(201).json(suit);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
