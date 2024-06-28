import { RequestHandler } from "express";
import {
  createChoiceService,
  deleteChoiceService,
  updateChoiceService,
  getChoiceByPlotFieldCommandIdService,
} from "../../../../services/StoryEditor/PlotField/Choice/ChoiceService";

type GetChoiceByPlotFieldCommandIdParams = {
  plotFieldCommandId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/:plotFieldCommandId/choices
// @access Private
export const getChoiceByPlotFieldCommandIdController: RequestHandler<
  GetChoiceByPlotFieldCommandIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await getChoiceByPlotFieldCommandIdService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateChoiceParams = {
  plotFieldCommandId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/:plotFieldCommandId/choices
// @access Private
export const createChoiceController: RequestHandler<
  CreateChoiceParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await createChoiceService({
      plotFieldCommandId: req.params.plotFieldCommandId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateChoiceParams = {
  choiceId: string;
  exitBlockId: string;
};

export type ChoiceType = "common" | "multiple" | "timelimit";

type UpdateChoiceBody = {
  choiceQuestion: string | undefined;
  currentLanguage: string | undefined;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/:choiceId/exitBlocks/:exitBlockId
// @access Private
export const updateChoiceController: RequestHandler<
  UpdateChoiceParams,
  unknown,
  UpdateChoiceBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceService({
      currentLanguage: req.body.currentLanguage,
      choiceQuestion: req.body.choiceQuestion,
      timeLimit: req.body.timeLimit,
      choiceType: req.body.choiceType,
      choiceId: req.params.choiceId,
      exitBlockId: req.params.exitBlockId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteChoiceParams = {
  choiceId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/choices/:choiceId
// @access Private
export const deleteChoiceController: RequestHandler<
  DeleteChoiceParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await deleteChoiceService({
      choiceId: req.params.choiceId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
