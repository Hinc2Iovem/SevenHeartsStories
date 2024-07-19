import createHttpError from "http-errors";
import { SignTypes } from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionValueController";
import ConditionBlock from "../../../../models/StoryEditor/PlotField/Condition/ConditionBlock";
import ConditionValue from "../../../../models/StoryEditor/PlotField/Condition/ConditionValue";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetByConditionBlockIdTypes = {
  conditionBlockId: string;
};

export const getConditionValueByConditionBlockIdService = async ({
  conditionBlockId,
}: GetByConditionBlockIdTypes) => {
  validateMongoId({
    value: conditionBlockId,
    valueName: "ConditionBlock",
  });

  const existingConditionValue = await ConditionValue.find({
    conditionBlockId,
  }).lean();

  if (!existingConditionValue.length) {
    return [];
  }

  return existingConditionValue;
};

type CreateConditionValueTypes = {
  conditionBlockId: string;
};

export const createConditionValueService = async ({
  conditionBlockId,
}: CreateConditionValueTypes) => {
  validateMongoId({ value: conditionBlockId, valueName: "ConditionBlock" });

  const existingConditionBlock = await ConditionBlock.findById(
    conditionBlockId
  ).lean();
  if (!existingConditionBlock) {
    throw createHttpError(400, "ConditionBlock with such id wasn't found");
  }

  return await ConditionValue.create({
    conditionBlockId: conditionBlockId,
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

  if (sign) {
    if (!regexSign.test(sign)) {
      throw createHttpError(400, "Sign can only be equal to: >,<,<=,>=,=");
    }
    existingConditionValue.sign = sign;
  }
  if (value) {
    existingConditionValue.value = value;
  }
  if (name?.trim().length) {
    existingConditionValue.name = name;
  }

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
