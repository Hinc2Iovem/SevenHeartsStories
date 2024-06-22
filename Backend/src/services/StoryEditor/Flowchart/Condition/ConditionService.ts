import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/Flowchart/Condition/Condition";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import ConditionValue from "../../../../models/StoryEditor/Flowchart/Condition/ConditionValue";

type CreateConditionTypes = {
  targetBlockId: string;
  flowchartCommandId: string;
};

export const createConditionService = async ({
  targetBlockId,
  flowchartCommandId,
}: CreateConditionTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });
  validateMongoId({ value: targetBlockId, valueName: "Topology Block" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }
  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTargetBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  await Condition.create({
    flowchartCommandId,
    isElse: true,
    targetBlockId,
  });
  const condition = await Condition.create({
    flowchartCommandId,
    targetBlockId,
  });
  await ConditionValue.create({ flowchartCommandConditionId: condition._id });
  return condition;
};

export const addAnotherBlockConditionService = async ({
  targetBlockId,
  flowchartCommandId,
}: CreateConditionTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });
  validateMongoId({ value: targetBlockId, valueName: "Topology Block" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }
  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTargetBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const condition = await Condition.create({
    flowchartCommandId,
    targetBlockId,
  });
  await ConditionValue.create({ flowchartCommandConditionId: condition._id });
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
    flowchartCommandConditionId: conditionId,
  }).exec();
  for (const c of conditionValues) {
    await c.deleteOne();
  }

  return `Condition with id ${conditionId} was removed`;
};
