import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/Flowchart/Condition/Condition";
import ConditionValue from "../../../../models/StoryEditor/Flowchart/Condition/ConditionValue";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { SignTypes } from "../../../../controllers/StoryEditor/Flowchart/Condition/ConditionValueController";

type CreateConditionValueTypes = {
  conditionId: string;
};

export const createConditionValueService = async ({
  conditionId,
}: CreateConditionValueTypes) => {
  validateMongoId({ value: conditionId, valueName: "Condition" });

  const existingCondition = await Condition.findById(conditionId).lean();
  if (!existingCondition) {
    throw createHttpError(400, "Condition with such id wasn't found");
  }

  return await ConditionValue.create({
    flowchartCommandConditionId: conditionId,
  });
};

const regexSign = /^(>|<|<=|>=|=)$/;

type UpdateConditionValueTypes = {
  name: string | undefined;
  sign: SignTypes | undefined;
  value: number | undefined;
  conditionValueId: string;
};

export const updateConditionValueService = async ({
  conditionValueId,
  name,
  sign,
  value,
}: UpdateConditionValueTypes) => {
  validateMongoId({ value: conditionValueId, valueName: "ConditionValue" });

  const existingConditionValue = await ConditionValue.findById(
    conditionValueId
  ).exec();
  if (!existingConditionValue) {
    throw createHttpError(400, "ConditionValue with such id wasn't found");
  }

  if (!sign || !value || !name?.trim().length) {
    throw createHttpError(400, "Sign, value and name are required");
  }

  if (!regexSign.test(sign)) {
    throw createHttpError(400, "Sign can only be equal to: >,<,<=,>=,=");
  }

  existingConditionValue.name = name;
  existingConditionValue.sign = sign;
  existingConditionValue.value = value;

  return await existingConditionValue.save();
};

type DeleteConditionValueTypes = {
  conditionValueId: string;
};

export const deleteConditionValueService = async ({
  conditionValueId,
}: DeleteConditionValueTypes) => {
  validateMongoId({ value: conditionValueId, valueName: "ConditionValue" });

  await ConditionValue.findByIdAndDelete(conditionValueId);

  return `ConditionValue with id ${conditionValueId} was removed`;
};
