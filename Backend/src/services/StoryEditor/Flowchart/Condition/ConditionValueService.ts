import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/Flowchart/Condition/Condition";
import ConditionValue from "../../../../models/StoryEditor/Flowchart/Condition/ConditionValue";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { SignTypes } from "../../../../controllers/StoryEditor/Flowchart/Condition/ConditionValueController";

const regexSign = /^(>|<|<=|>=|=)$/;

type CreateConditionValueTypes = {
  name: string | undefined;
  sign: SignTypes | undefined;
  value: number | undefined;
  conditionId: string;
};

export const createConditionValueService = async ({
  conditionId,
  name,
  sign,
  value,
}: CreateConditionValueTypes) => {
  validateMongoId({ value: conditionId, valueName: "Condition" });

  const existingCondition = await Condition.findById(conditionId).lean();
  if (!existingCondition) {
    throw createHttpError(400, "Condition with such id wasn't found");
  }

  if (!sign || !value || !name?.trim().length) {
    throw createHttpError(400, "Sign, value and name are required");
  }

  if (!regexSign.test(sign)) {
    throw createHttpError(400, "Sign can only be equal to: >,<,<=,>=,=");
  }
  return await ConditionValue.create({
    flowchartCommandConditionId: conditionId,
    name,
    sign,
    value,
  });
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
