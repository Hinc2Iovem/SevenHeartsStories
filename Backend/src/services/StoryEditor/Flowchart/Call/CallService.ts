import createHttpError from "http-errors";
import { Types } from "mongoose";
import Call from "../../../../models/StoryEditor/Flowchart/Call/Call";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../../utils/validateMongoId";

type CreateCallTypes = {
  flowchartCommandId: string;
  targetBlockId: string;
};

export const createCallService = async ({
  targetBlockId,
  flowchartCommandId,
}: CreateCallTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });
  validateMongoId({ value: targetBlockId, valueName: "TargetBlock" });

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

  return await Call.create({
    flowchartCommandId,
    targetBlockId,
  });
};

type UpdateCallTypes = {
  callId: string;
  newTargetBlockId: string;
};

export const updateCallService = async ({
  newTargetBlockId,
  callId,
}: UpdateCallTypes) => {
  validateMongoId({ value: newTargetBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: callId, valueName: "Call" });

  const existingNewTargetBlockId = await TopologyBlock.findById(
    newTargetBlockId
  ).lean();
  if (!existingNewTargetBlockId) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  const existingCall = await Call.findById(callId).exec();
  if (!existingCall) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  existingCall.targetBlockId = new Types.ObjectId(newTargetBlockId);

  return existingCall.save();
};

type DeleteCallTypes = {
  callId: string;
};

export const deleteCallService = async ({ callId }: DeleteCallTypes) => {
  validateMongoId({ value: callId, valueName: "Call" });

  await Call.findByIdAndDelete(callId);

  return `Call with id ${callId} was removed`;
};
