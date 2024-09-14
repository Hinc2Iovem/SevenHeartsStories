import createHttpError from "http-errors";
import Story from "../../../../models/StoryData/Story";
import Key from "../../../../models/StoryEditor/PlotField/Key/Key";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetKeyByStoryIdTypes = {
  storyId: string;
};

export const getKeyByStoryIdService = async ({
  storyId,
}: GetKeyByStoryIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingKey = await Key.find({
    storyId,
  }).lean();

  if (!existingKey.length) {
    return [];
  }

  return existingKey;
};
type GetKeyByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getKeyByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetKeyByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingKey = await Key.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingKey) {
    return null;
  }

  return existingKey;
};

type CreateKeyDuplicateTypes = {
  topologyBlockId: string;
  storyId: string;
  commandOrder?: number;
};

export const createKeyDuplicateService = async ({
  topologyBlockId,
  storyId,
  commandOrder,
}: CreateKeyDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: storyId, valueName: "Story" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await Key.create({
    plotFieldCommandId: newPlotfieldCommand._id,
    storyId,
  });
};

type CreateCommandKeyTypes = {
  plotFieldCommandId: string;
  storyId: string;
};

export const createCommandKeyService = async ({
  plotFieldCommandId,
  storyId,
}: CreateCommandKeyTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, "Story with such id wasn't found");
  }

  return await Key.create({
    plotFieldCommandId,
    storyId,
  });
};

type UpdateCommandKeyTypes = {
  commandKeyId: string;
  text: string;
};

export const updateCommandKeyService = async ({
  text,
  commandKeyId,
}: UpdateCommandKeyTypes) => {
  validateMongoId({ value: commandKeyId, valueName: "CommandKey" });

  const existingCommandKey = await Key.findById(commandKeyId).exec();
  if (!existingCommandKey) {
    throw createHttpError(400, "CommandKey with such id wasn't found");
  }

  if (text?.trim().length) {
    existingCommandKey.text = text;
  }

  return await existingCommandKey.save();
};

// type UpdateCommandKeyTargetBlockTypes = {
//   commandKeyId: string;
//   newTargetBlockId: string;
// };

// export const updateCommandKeyTargetBlockIdService = async ({
//   newTargetBlockId,
//   commandKeyId,
// }: UpdateCommandKeyTargetBlockTypes) => {
//   validateMongoId({ value: newTargetBlockId, valueName: "TopologyBlock" });
//   validateMongoId({ value: commandKeyId, valueName: "CommandKey" });

//   const existingNewTargetBlockId = await TopologyBlock.findById(
//     newTargetBlockId
//   ).lean();
//   if (!existingNewTargetBlockId) {
//     throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
//   }

//   const existingCommandKey = await Key.findById(commandKeyId).exec();
//   if (!existingCommandKey) {
//     throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
//   }

//   existingCommandKey.targetBlockId = new Types.ObjectId(newTargetBlockId);

//   return existingCommandKey.save();
// };

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
