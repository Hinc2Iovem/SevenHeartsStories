import { RequestHandler } from "express";
import {
  createSuitService,
  deleteSuitService,
  updateSuitService,
  getSuitByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/Suit/SuitService.ts";

type GetSuitByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/suits
// @access Private
export const getSuitByPlotFieldCommandIdController: RequestHandler<
  GetSuitByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const suit = await getSuitByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type CreateSuitParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/suits
// @access Private
export const createSuitController: RequestHandler<
  CreateSuitParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const suit = await createSuitService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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
  characterId: string;
};

type UpdateSuitBody = {
  suitName: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/characters/:characterId/suits/:suitId
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
      characterId: req.params.characterId,
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

// @route DELETE http://localhost:3500/plotFieldCommands/suits/:suitId
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
