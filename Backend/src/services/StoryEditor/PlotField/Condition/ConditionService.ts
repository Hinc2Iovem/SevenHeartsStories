import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/PlotField/Condition/Condition";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import ConditionValue from "../../../../models/StoryEditor/PlotField/Condition/ConditionValue";

type CreateConditionTypes = {
  targetBlockId: string;
  plotFieldCommandId: string;
};

export const createConditionService = async ({
  targetBlockId,
  plotFieldCommandId,
}: CreateConditionTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: targetBlockId, valueName: "Topology Block" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }
  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTargetBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  await Condition.create({
    plotFieldCommandId,
    isElse: true,
    targetBlockId,
  });
  const condition = await Condition.create({
    plotFieldCommandId,
    targetBlockId,
  });
  await ConditionValue.create({ plotFieldCommandConditionId: condition._id });
  return condition;
};

export const addAnotherBlockConditionService = async ({
  targetBlockId,
  plotFieldCommandId,
}: CreateConditionTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: targetBlockId, valueName: "Topology Block" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }
  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTargetBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const condition = await Condition.create({
    plotFieldCommandId,
    targetBlockId,
  });
  await ConditionValue.create({ plotFieldCommandConditionId: condition._id });
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
