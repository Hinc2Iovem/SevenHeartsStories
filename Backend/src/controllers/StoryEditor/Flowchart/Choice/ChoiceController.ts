import { RequestHandler } from "express";
import {
  createChoiceService,
  deleteChoiceService,
  updateChoiceService,
} from "../../../../services/StoryEditor/Flowchart/Choice/ChoiceService";

type CreateChoiceParams = {
  flowchartCommandId: string;
};

// @route POST http://localhost:3500/flowchartCommands/:flowchartCommandId/choices
// @access Private
export const createChoiceController: RequestHandler<
  CreateChoiceParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await createChoiceService({
      flowchartCommandId: req.params.flowchartCommandId,
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
};

export type ChoiceType = "common" | "multiple" | "timelimit";

type UpdateChoiceBody = {
  choiceQuestion: string | undefined;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
};

// @route PATCH http://localhost:3500/flowchartCommands/choices/:choiceId
// @access Private
export const updateChoiceController: RequestHandler<
  UpdateChoiceParams,
  unknown,
  UpdateChoiceBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceService({
      choiceQuestion: req.body.choiceQuestion,
      timeLimit: req.body.timeLimit,
      choiceType: req.body.choiceType,
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

type DeleteChoiceParams = {
  choiceId: string;
};

// @route DELETE http://localhost:3500/flowchartCommands/choices/:choiceId
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
