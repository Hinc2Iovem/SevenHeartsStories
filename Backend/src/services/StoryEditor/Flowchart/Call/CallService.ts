import createHttpError from "http-errors";
import { Types } from "mongoose";
import Call from "../../../../models/StoryEditor/Flowchart/Call/Call";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";

type CreateCallTypes = {
  flowchartCommandId: string;
};

export const createCallService = async ({
  flowchartCommandId,
}: CreateCallTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Call.create({
    flowchartCommandId,
  });
};

type UpdateCallTypes = {
  callId: string;
  targetBlockId: string;
  sourceBlockId: string | undefined;
};

export const updateCallService = async ({
  targetBlockId,
  callId,
  sourceBlockId,
}: UpdateCallTypes) => {
  validateMongoId({ value: callId, valueName: "Call" });
  validateMongoId({ value: targetBlockId, valueName: "TargetBlock" });
  validateMongoId({ value: sourceBlockId, valueName: "SourceBlock" });

  const existingSourceBlockId = await TopologyBlock.findById(
    sourceBlockId
  ).lean();
  if (!existingSourceBlockId) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const existingCall = await Call.findById(callId).exec();
  if (!existingCall) {
    throw createHttpError(400, "Call with such id wasn't found");
  }
  const existingTargetBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTargetBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const existingTopologyConnection = await TopologyBlockConnection.findOne({
    sourceBlockId,
    targetBlockId,
  }).exec();

  if (existingTopologyConnection) {
    existingTopologyConnection.targetBlockId = new Types.ObjectId(
      targetBlockId
    );
    await existingTopologyConnection.save();
  } else {
    await TopologyBlockConnection.create({ sourceBlockId, targetBlockId });
  }

  existingCall.targetBlockId = new Types.ObjectId(targetBlockId);

  return await existingCall.save();
};

type UpdateCallTargetBlockTypes = {
  callId: string;
  newTargetBlockId: string;
};

export const updateCallTargetBlockIdService = async ({
  newTargetBlockId,
  callId,
}: UpdateCallTargetBlockTypes) => {
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

  const currentFlowchartCommand = await FlowchartCommand.findById(
    existingCall.flowchartCommandId
  ).lean();
  const sourceBlockId = currentFlowchartCommand?.topologyBlockId;

  const existingTopologyConnection = await TopologyBlockConnection.findOne({
    sourceBlockId,
    targetBlockId: existingCall.targetBlockId,
  }).exec();

  if (existingTopologyConnection) {
    existingTopologyConnection.targetBlockId = new Types.ObjectId(
      newTargetBlockId
    );
    await existingTopologyConnection.save();
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
