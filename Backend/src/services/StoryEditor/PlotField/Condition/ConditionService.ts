import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/PlotField/Condition/Condition";
import ConditionBlock from "../../../../models/StoryEditor/PlotField/Condition/ConditionBlock";
import ConditionValue from "../../../../models/StoryEditor/PlotField/Condition/ConditionValue";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetConditionByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getConditionByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetConditionByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingCondition = await Condition.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingCondition) {
    return null;
  }

  return existingCondition;
};

type CreateConditionTypes = {
  plotFieldCommandId: string;
};

export const createConditionService = async ({
  plotFieldCommandId,
}: CreateConditionTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const condition = await Condition.create({
    plotFieldCommandId,
  });

  const ifConditionBlock = await ConditionBlock.create({
    conditionId: condition._id,
  });

  await ConditionBlock.create({
    conditionId: condition._id,
    isElse: true,
  });

  await ConditionValue.create({ conditionBlockId: ifConditionBlock._id });
  return condition;
};

type DeleteConditionTypes = {
  conditionId: string;
};

export const deleteConditionService = async ({
  conditionId,
}: DeleteConditionTypes) => {
  validateMongoId({ value: conditionId, valueName: "Condition" });

  await Condition.findByIdAndDelete(conditionId);

  const conditionValues = await ConditionValue.find({
    plotFieldCommandConditionId: conditionId,
  }).exec();
  for (const c of conditionValues) {
    await c.deleteOne();
  }

  return `Condition with id ${conditionId} was removed`;
};
