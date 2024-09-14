import { RequestHandler } from "express";
import {
  deleteChoiceService,
  updateChoiceService,
  getChoiceByPlotFieldCommandIdService,
  updateChoiceIsAuthorService,
  updateChoiceTypeService,
  createChoiceDuplicateService,
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

type UpdateChoiceParams = {
  choiceId: string;
};

export type ChoiceType = "common" | "multiple" | "timelimit";

type UpdateChoiceBody = {
  exitBlockId: string | undefined;
  characterEmotionId: string | undefined;
  optionOrder: number | undefined;
  characterId: string | undefined;
  timeLimit: number | undefined;
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
      exitBlockId: req.body.exitBlockId,
      characterEmotionId: req.body.characterEmotionId,
      optionOrder: req.body.optionOrder,
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
  isAuthor: boolean | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/:choiceId/isAuthor
// @access Private
export const updateChoiceIsAuthorController: RequestHandler<
  UpdateChoiceTextParams,
  unknown,
  UpdateChoiceTextBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceIsAuthorService({
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

type CreateChoiceDuplicateParams = {
  topologyBlockId: string;
};

type CreateChoiceDuplicateBody = {
  isAuthor: boolean | undefined;
  choiceType?: string;
  exitBlockId?: string;
  characterId?: string;
  characterEmotionId?: string;
  timeLimitDefaultOptionId?: string;
  timeLimit?: number;
  amountOfOptions?: number;
  commandOrder?: number;
};

// @route POST http://localhost:3500/plotFieldCommands/choices/topologyBlocks/:topologyBlockId/copy
// @access Private
export const createChoiceDuplicateController: RequestHandler<
  CreateChoiceDuplicateParams,
  unknown,
  CreateChoiceDuplicateBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await createChoiceDuplicateService({
      topologyBlockId: req.params.topologyBlockId,
      isAuthor: req.body.isAuthor,
      choiceType: req.body.choiceType,
      exitBlockId: req.body.exitBlockId,
      characterId: req.body.characterId,
      characterEmotionId: req.body.characterEmotionId,
      timeLimit: req.body.timeLimit,
      timeLimitDefaultOptionId: req.body.timeLimitDefaultOptionId,
      amountOfOptions: req.body.amountOfOptions,
      commandOrder: req.body.commandOrder,
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
