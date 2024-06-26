import createHttpError from "http-errors";
import { Types } from "mongoose";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";
import Key from "../../../../models/StoryEditor/PlotField/Key/Key";

type CreateCommandKeyTypes = {
  plotFieldCommandId: string;
};

export const createCommandKeyService = async ({
  plotFieldCommandId,
}: CreateCommandKeyTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Key.create({
    plotFieldCommandId,
  });
};

type UpdateCommandKeyTypes = {
  commandKeyId: string;
  targetBlockId: string;
  sourceBlockId: string | undefined;
};

export const updateCommandKeyService = async ({
  targetBlockId,
  commandKeyId,
  sourceBlockId,
}: UpdateCommandKeyTypes) => {
  validateMongoId({ value: commandKeyId, valueName: "CommandKey" });
  validateMongoId({ value: targetBlockId, valueName: "TargetBlock" });
  validateMongoId({ value: sourceBlockId, valueName: "SourceBlock" });

  const existingSourceBlockId = await TopologyBlock.findById(
    sourceBlockId
  ).lean();
  if (!existingSourceBlockId) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const existingCommandKey = await Key.findById(commandKeyId).exec();
  if (!existingCommandKey) {
    throw createHttpError(400, "CommandKey with such id wasn't found");
  }
  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTargetBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  existingCommandKey.targetBlockId = new Types.ObjectId(targetBlockId);

  return await existingCommandKey.save();
};

type UpdateCommandKeyTargetBlockTypes = {
  commandKeyId: string;
  newTargetBlockId: string;
};

export const updateCommandKeyTargetBlockIdService = async ({
  newTargetBlockId,
  commandKeyId,
}: UpdateCommandKeyTargetBlockTypes) => {
  validateMongoId({ value: newTargetBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: commandKeyId, valueName: "CommandKey" });

  const existingNewTargetBlockId = await TopologyBlock.findById(
    newTargetBlockId
  ).lean();
  if (!existingNewTargetBlockId) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const existingCommandKey = await Key.findById(commandKeyId).exec();
  if (!existingCommandKey) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  existingCommandKey.targetBlockId = new Types.ObjectId(newTargetBlockId);

  return existingCommandKey.save();
};

type DeleteCommandKeyTypes = {
  commandKeyId: string;
};

export const deleteCommandKeyService = async ({
  commandKeyId,
}: DeleteCommandKeyTypes) => {
  validateMongoId({ value: commandKeyId, valueName: "CommandKey" });

  await Key.findByIdAndDelete(commandKeyId);

  return `CommandKey with id ${commandKeyId} was removed`;
};
