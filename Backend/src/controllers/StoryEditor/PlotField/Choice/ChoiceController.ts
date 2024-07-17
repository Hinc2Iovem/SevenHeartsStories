import { RequestHandler } from "express";
import {
  createChoiceService,
  deleteChoiceService,
  updateChoiceService,
  getChoiceByPlotFieldCommandIdService,
  updateChoiceTextService,
  updateChoiceTypeService,
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
};

export type ChoiceType = "common" | "multiple" | "timelimit";

type UpdateChoiceBody = {
  exitBlockId: string | undefined;
  characterEmotionId: string | undefined;
  characterId: string | undefined;
  timeLimit: number | undefined;
  isAuthor: boolean | undefined;
  choiceType: ChoiceType | undefined;
};
// @route PATCH http://localhost:3500/plotFieldCommands/choices/:choiceId
// @access Private
export const updateChoiceController: RequestHandler<
  UpdateChoiceParams,
  unknown,
  UpdateChoiceBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceService({
      choiceId: req.params.choiceId,
      timeLimit: req.body.timeLimit,
      choiceType: req.body.choiceType,
      isAuthor: req.body.isAuthor,
      exitBlockId: req.body.exitBlockId,
      characterEmotionId: req.body.characterEmotionId,
      characterId: req.body.characterId,
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

type UpdateChoiceTypeParams = {
  choiceId: string;
};

type UpdateChoiceTypeBody = {
  choiceType: ChoiceType | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/:choiceId/type
// @access Private
export const updateChoiceTypeController: RequestHandler<
  UpdateChoiceTypeParams,
  unknown,
  UpdateChoiceTypeBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceTypeService({
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

type UpdateChoiceTextParams = {
  choiceId: string;
};

type UpdateChoiceTextBody = {
  characterId: string | undefined;
  characterEmotionId: string | undefined;
  isAuthor: boolean | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/:choiceId/text
// @access Private
export const updateChoiceTextController: RequestHandler<
  UpdateChoiceTextParams,
  unknown,
  UpdateChoiceTextBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceTextService({
      characterEmotionId: req.body.characterEmotionId,
      characterId: req.body.characterId,
      isAuthor: req.body.isAuthor,
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
