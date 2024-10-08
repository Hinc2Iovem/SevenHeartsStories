import { RequestHandler } from "express";
import {
  createConditionValueService,
  deleteConditionValueService,
  updateConditionValueService,
  getConditionValueByConditionBlockIdService,
} from "../../../../services/StoryEditor/PlotField/Condition/ConditionValueService";

type GetConditionValueByConditionBlockIdParams = {
  conditionBlockId: string;
};

// @route GET http://localhost:3500/plotFieldCommands/conditionBlocks/:conditionBlockId/conditionValues
// @access Private
export const getConditionValueByConditionBlockIdController: RequestHandler<
  GetConditionValueByConditionBlockIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const conditionValue = await getConditionValueByConditionBlockIdService({
      conditionBlockId: req.params.conditionBlockId,
    });
    if (conditionValue) {
      return res.status(201).json(conditionValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type CreateConditionValueParams = {
  conditionBlockId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/conditionBlocks/:conditionBlockId/conditionValues
// @access Private
export const createConditionValueController: RequestHandler<
  CreateConditionValueParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const conditionValue = await createConditionValueService({
      conditionBlockId: req.params.conditionBlockId,
    });
    if (conditionValue) {
      return res.status(201).json(conditionValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type UpdateConditionValueParams = {
  conditionValueId: string;
};

export type SignTypes = ">" | "<" | "<=" | ">=" | "=";

type UpdateConditionValueBody = {
  name: string | undefined;
  sign: SignTypes | undefined;
  value: number | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/conditions/conditionValues/:conditionValueId
// @access Private
export const updateConditionValueController: RequestHandler<
  UpdateConditionValueParams,
  unknown,
  UpdateConditionValueBody,
  unknown
> = async (req, res, next) => {
  try {
    const conditionValue = await updateConditionValueService({
      conditionValueId: req.params.conditionValueId,
      name: req.body.name,
      sign: req.body.sign,
      value: req.body.value,
    });
    if (conditionValue) {
      return res.status(201).json(conditionValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type DeleteConditionValueParams = {
  conditionValueId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/conditions/conditionValues/:conditionValueId
// @access Private
export const deleteConditionValueController: RequestHandler<
  DeleteConditionValueParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const conditionValue = await deleteConditionValueService({
      conditionValueId: req.params.conditionValueId,
    });
    if (conditionValue) {
      return res.status(201).json(conditionValue);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
