import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/PlotField/Condition/Condition";
import { validateMongoId } from "../../../../utils/validateMongoId";
import ConditionBlock from "../../../../models/StoryEditor/PlotField/Condition/ConditionBlock";
import ConditionValue from "../../../../models/StoryEditor/PlotField/Condition/ConditionValue";
import { Types } from "mongoose";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";

type GetConditionBlocksByCommandConditionIdTypes = {
  commandConditionId: string;
};

export const getConditionBlocksByCommandConditionIdService = async ({
  commandConditionId,
}: GetConditionBlocksByCommandConditionIdTypes) => {
  validateMongoId({ value: commandConditionId, valueName: "CommandCondition" });

  const existingConditionBlock = await ConditionBlock.find({
    conditionId: commandConditionId,
  }).lean();

  if (!existingConditionBlock.length) {
    return [];
  }

  return existingConditionBlock;
};

type AddAnotherConditionBlockTypes = {
  commandConditionId: string;
};

export const addAnotherBlockConditionService = async ({
  commandConditionId,
}: AddAnotherConditionBlockTypes) => {
  validateMongoId({ value: commandConditionId, valueName: "PlotFieldCommand" });

  const existingCondition = await Condition.findById(commandConditionId).lean();
  if (!existingCondition) {
    throw createHttpError(400, "Condition with such id wasn't found");
  }

  const ifConditionBlock = await ConditionBlock.create({
    conditionId: commandConditionId,
  });
  await ConditionValue.create({ conditionBlockId: ifConditionBlock._id });
  return ifConditionBlock;
};

type UpdateConditionBlockTopologyBlockTypes = {
  conditionBlockId: string;
  targetBlockId: string;
  sourceBlockId: string;
};

export const updateBlockConditionTopologyBlockService = async ({
  conditionBlockId,
  sourceBlockId,
  targetBlockId,
}: UpdateConditionBlockTopologyBlockTypes) => {
  validateMongoId({ value: conditionBlockId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: sourceBlockId, valueName: "SourceBlock" });
  validateMongoId({ value: targetBlockId, valueName: "TargetBlock" });

  const existingConditionBlock = await ConditionBlock.findById(
    conditionBlockId
  ).exec();
  if (!existingConditionBlock) {
    throw createHttpError(400, "ConditionBlock with such id wasn't found");
  }

  const existingTopologyBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  if (existingConditionBlock.targetBlockId) {
    const existingTopologyConnection = await TopologyBlockConnection.findOne({
      sourceBlockId,
      targetBlockId: existingConditionBlock.targetBlockId,
    }).exec();

    if (existingTopologyConnection) {
      existingTopologyConnection.targetBlockId = new Types.ObjectId(
        targetBlockId
      );
      await existingTopologyConnection.save();
    }
  } else {
    await TopologyBlockConnection.create({
      sourceBlockId,
      targetBlockId,
      episodeId: existingTopologyBlock.episodeId,
    });
  }

  existingConditionBlock.targetBlockId = new Types.ObjectId(targetBlockId);
  return await existingConditionBlock.save();
};

type UpdateConditionBlockOrderOfExecutionTypes = {
  conditionBlockId: string;
  orderOfExecution: number;
};

export const updateBlockConditionOrderOfExecutionService = async ({
  conditionBlockId,
  orderOfExecution,
}: UpdateConditionBlockOrderOfExecutionTypes) => {
  validateMongoId({ value: conditionBlockId, valueName: "PlotFieldCommand" });

  const existingConditionBlock = await ConditionBlock.findById(
    conditionBlockId
  ).exec();
  if (!existingConditionBlock) {
    throw createHttpError(400, "ConditionBlock with such id wasn't found");
  }

  if (!orderOfExecution) {
    throw createHttpError(400, "orderOfExecution is required");
  }

  if (existingConditionBlock.orderOfExecution === orderOfExecution) {
    existingConditionBlock.orderOfExecution = null;
  } else {
    const allConditionBlocks = await ConditionBlock.find({
      conditionId: existingConditionBlock.conditionId,
    }).exec();
    for (const c of allConditionBlocks) {
      if (c.orderOfExecution === orderOfExecution) {
        c.orderOfExecution = null;
        console.log(c);
        await c.save();
      }
    }
    existingConditionBlock.orderOfExecution = orderOfExecution;
  }
  return await existingConditionBlock.save();
};
