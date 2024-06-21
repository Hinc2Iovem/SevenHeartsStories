import createHttpError from "http-errors";
import { validateMongoId } from "../../../utils/validateMongoId";
import FlowchartCommand from "../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Flowchart from "../../../models/StoryEditor/Flowchart/Flowchart";

type FlowchartCommandCreateTypes = {
  flowchartId: string;
  command: string | undefined;
};

export const flowchartCommandCreateService = async ({
  command,
  flowchartId,
}: FlowchartCommandCreateTypes) => {
  validateMongoId({ value: flowchartId, valueName: "Flowchart" });

  const existingFlowchart = await Flowchart.find().lean();

  const commandOrder = existingFlowchart.length ? existingFlowchart.length : 1;

  if (!command?.trim().length) {
    throw createHttpError(400, "Command is required");
  }

  return await FlowchartCommand.create({ command, flowchartId, commandOrder });
};

type FlowchartCommandUpdateTypes = {
  flowchartCommandId: string;
  commandSide: string | undefined;
};

export const flowchartCommandUpdateCommandSideService = async ({
  commandSide,
  flowchartCommandId,
}: FlowchartCommandUpdateTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "Flowchart" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).exec();

  if (!existingFlowchartCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  if (!commandSide?.trim().length) {
    throw createHttpError(400, "Command Side is required");
  }

  existingFlowchartCommand.commandSide = commandSide;

  return await existingFlowchartCommand.save();
};

type FlowchartCommandNameUpdateTypes = {
  flowchartCommandId: string;
  commandName: string | undefined;
};

export const flowchartCommandUpdateCommandNameService = async ({
  commandName,
  flowchartCommandId,
}: FlowchartCommandNameUpdateTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "Flowchart" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).exec();

  if (!existingFlowchartCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  if (!commandName?.trim().length) {
    throw createHttpError(400, "Command Name is required");
  }

  existingFlowchartCommand.command = commandName;

  return await existingFlowchartCommand.save();
};

type FlowchartCommandOrderUpdateTypes = {
  flowchartCommandId: string;
  newOrder: number;
};

export const flowchartCommandUpdateCommandOrderService = async ({
  newOrder,
  flowchartCommandId,
}: FlowchartCommandOrderUpdateTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "Flowchart" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).exec();

  if (!existingFlowchartCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  const flowchartId = existingFlowchartCommand.flowchartId;

  const commandOldOrder = existingFlowchartCommand.commandOrder;
  if (!commandOldOrder) {
    throw createHttpError(400, "Command doesn't exist");
  }

  for (let i = newOrder; i < commandOldOrder; i++) {
    const flowchartCommandIncreasedOrder = await FlowchartCommand.findOne({
      flowchartId,
      commandOrder: i,
    }).exec();
    if (flowchartCommandIncreasedOrder) {
      flowchartCommandIncreasedOrder.commandOrder = i;
      await flowchartCommandIncreasedOrder.save();
    }
  }

  existingFlowchartCommand.commandOrder = newOrder;
  return await existingFlowchartCommand.save();
};

type FlowchartCommandDeleteTypes = {
  flowchartCommandId: string;
};

export const flowchartCommandDeleteService = async ({
  flowchartCommandId,
}: FlowchartCommandDeleteTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "Flowchart" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).exec();

  if (!existingFlowchartCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  await existingFlowchartCommand.deleteOne();
  return `FlowchartCommand with id ${flowchartCommandId} was removed`;
};
