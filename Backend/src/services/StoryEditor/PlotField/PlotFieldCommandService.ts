import createHttpError from "http-errors";
import { validateMongoId } from "../../../utils/validateMongoId";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetAllPlotFieldCommandsTypes = {
  topologyBlockId: string;
};

export const getAllPlotFieldCommandsService = async ({
  topologyBlockId,
}: GetAllPlotFieldCommandsTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingCommands = await PlotFieldCommand.find({
    topologyBlockId,
  }).lean();
  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

type PlotFieldCommandCreateTypes = {
  topologyBlockId: string;
};

export const plotFieldCommandCreateService = async ({
  topologyBlockId,
}: PlotFieldCommandCreateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingPlotFieldCommands = await PlotFieldCommand.find({
    topologyBlockId,
  }).lean();

  const commandOrder = existingPlotFieldCommands.length
    ? existingPlotFieldCommands.length
    : 0;

  return await PlotFieldCommand.create({ topologyBlockId, commandOrder });
};

type PlotFieldCommandNameUpdateTypes = {
  plotFieldCommandId: string;
  commandName: string | undefined;
};

export const plotFieldCommandUpdateCommandNameService = async ({
  commandName,
  plotFieldCommandId,
}: PlotFieldCommandNameUpdateTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotField" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();

  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  if (!commandName?.trim().length) {
    throw createHttpError(400, "Command Name is required");
  }

  existingPlotFieldCommand.command = commandName;

  return await existingPlotFieldCommand.save();
};

type PlotFieldCommandOrderUpdateTypes = {
  plotFieldCommandId: string;
  newOrder: number;
};

export const plotFieldCommandUpdateCommandOrderService = async ({
  newOrder,
  plotFieldCommandId,
}: PlotFieldCommandOrderUpdateTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotField" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();

  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  const topologyBlockId = existingPlotFieldCommand.topologyBlockId;

  const commandOldOrder = existingPlotFieldCommand.commandOrder;
  if (!commandOldOrder) {
    throw createHttpError(400, "Command doesn't exist");
  }

  for (let i = newOrder; i < commandOldOrder; i++) {
    const plotFieldCommandIncreasedOrder = await PlotFieldCommand.findOne({
      topologyBlockId,
      commandOrder: i,
    }).exec();
    if (plotFieldCommandIncreasedOrder) {
      plotFieldCommandIncreasedOrder.commandOrder = i;
      await plotFieldCommandIncreasedOrder.save();
    }
  }

  existingPlotFieldCommand.commandOrder = newOrder;
  return await existingPlotFieldCommand.save();
};

type PlotFieldCommandDeleteTypes = {
  plotFieldCommandId: string;
};

export const plotFieldCommandDeleteService = async ({
  plotFieldCommandId,
}: PlotFieldCommandDeleteTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotField" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();

  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  await existingPlotFieldCommand.deleteOne();
  return `PlotFieldCommand with id ${plotFieldCommandId} was removed`;
};
