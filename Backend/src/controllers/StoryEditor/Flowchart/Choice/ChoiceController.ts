import { RequestHandler } from "express";
import {
  createChoiceService,
  deleteChoiceService,
} from "../../../../services/StoryEditor/Flowchart/Choice/ChoiceService";

type CreateChoiceParams = {
  flowchartCommandId: string;
};

export type ChoiceType = "common" | "multiple" | "timelimit";

type CreateChoiceBody = {
  choiceQuestion: string | undefined;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
};

export const createChoiceController: RequestHandler<
  CreateChoiceParams,
  unknown,
  CreateChoiceBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await createChoiceService({
      choiceQuestion: req.body.choiceQuestion,
      timeLimit: req.body.timeLimit,
      choiceType: req.body.choiceType,
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

type DeleteChoiceParams = {
  choiceId: string;
};

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
