import createHttpError from "http-errors";
import Condition from "../../../../models/StoryEditor/PlotField/Condition/Condition";
import { validateMongoId } from "../../../../utils/validateMongoId";
import ConditionBlock from "../../../../models/StoryEditor/PlotField/Condition/ConditionBlock";
import ConditionValue from "../../../../models/StoryEditor/PlotField/Condition/ConditionValue";
import { Types } from "mongoose";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";

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
  topologyBlockId: string;
};

export const updateBlockConditionTopologyBlockService = async ({
  conditionBlockId,
  topologyBlockId,
}: UpdateConditionBlockTopologyBlockTypes) => {
  validateMongoId({ value: conditionBlockId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingConditionBlock = await ConditionBlock.findById(
    conditionBlockId
  ).exec();
  if (!existingConditionBlock) {
    throw createHttpError(400, "ConditionBlock with such id wasn't found");
  }

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).lean();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  existingConditionBlock.targetBlockId = new Types.ObjectId(topologyBlockId);
  return await existingConditionBlock.save();
};
