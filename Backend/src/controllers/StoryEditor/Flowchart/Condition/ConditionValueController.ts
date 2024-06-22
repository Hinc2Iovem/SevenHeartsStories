import { RequestHandler } from "express";
import {
  createConditionValueService,
  deleteConditionValueService,
  updateConditionValueService,
} from "../../../../services/StoryEditor/Flowchart/Condition/ConditionValueService";

type CreateConditionValueParams = {
  conditionId: string;
};

export const createConditionValueController: RequestHandler<
  CreateConditionValueParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const conditionValue = await createConditionValueService({
      conditionId: req.params.conditionId,
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
