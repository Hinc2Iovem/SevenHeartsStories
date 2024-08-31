import createHttpError from "http-errors";
import { Types } from "mongoose";
import Call from "../../../../models/StoryEditor/PlotField/Call/Call";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";

type GetCallByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getCallByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetCallByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingCall = await Call.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingCall) {
    return null;
  }

  return existingCall;
};

type CreateCallTypes = {
  plotFieldCommandId: string;
};

export const createCallService = async ({
  plotFieldCommandId,
}: CreateCallTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Call.create({
    plotFieldCommandId,
  });
};

type UpdateCallTypes = {
  callId: string;
  targetBlockId: string;
  sourceBlockId: string;
};

export const updateCallService = async ({
  targetBlockId,
  callId,
  sourceBlockId,
}: UpdateCallTypes) => {
  validateMongoId({ value: callId, valueName: "Call" });
  validateMongoId({ value: targetBlockId, valueName: "TargetBlock" });
  validateMongoId({ value: sourceBlockId, valueName: "SourceBlock" });

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

  if (existingCall.targetBlockId) {
    const existingTopologyConnection = await TopologyBlockConnection.findOne({
      sourceBlockId,
      targetBlockId: existingCall.targetBlockId,
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
      episodeId: existingTargetBlock.episodeId,
    });
  }

  existingCall.targetBlockId = new Types.ObjectId(targetBlockId);
  return await existingCall.save();
};

// type UpdateCallTargetBlockTypes = {
//   callId: string;
//   newTargetBlockId: string;
// };

// export const updateCallTargetBlockIdService = async ({
//   newTargetBlockId,
//   callId,
// }: UpdateCallTargetBlockTypes) => {
//   validateMongoId({ value: newTargetBlockId, valueName: "TopologyBlock" });
//   validateMongoId({ value: callId, valueName: "Call" });

//   const existingNewTargetBlockId = await TopologyBlock.findById(
//     newTargetBlockId
//   ).lean();
//   if (!existingNewTargetBlockId) {
//     throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
//   }

//   const existingCall = await Call.findById(callId).exec();
//   if (!existingCall) {
//     throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
//   }

//   const currentPlotFieldCommand = await PlotFieldCommand.findById(
//     existingCall.plotFieldCommandId
//   ).lean();
//   const sourceBlockId = currentPlotFieldCommand?.topologyBlockId;

//   const existingTopologyConnection = await TopologyBlockConnection.findOne({
//     sourceBlockId,
//     targetBlockId: existingCall.targetBlockId,
//   }).exec();

//   if (existingTopologyConnection) {
//     existingTopologyConnection.targetBlockId = new Types.ObjectId(
//       newTargetBlockId
//     );
//     await existingTopologyConnection.save();
//   }

//   existingCall.targetBlockId = new Types.ObjectId(newTargetBlockId);

//   return existingCall.save();
// };

type DeleteCallTypes = {
  callId: string;
};

export const deleteCallService = async ({ callId }: DeleteCallTypes) => {
  validateMongoId({ value: callId, valueName: "Call" });

  await Call.findByIdAndDelete(callId);

  return `Call with id ${callId} was removed`;
};
