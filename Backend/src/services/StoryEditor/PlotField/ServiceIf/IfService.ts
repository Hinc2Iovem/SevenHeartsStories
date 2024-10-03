import createHttpError from "http-errors";
import IfModel from "../../../../models/StoryEditor/PlotField/If/IfModel";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import IfValue from "../../../../models/StoryEditor/PlotField/If/IfValue";

type GetCommandIdsAndOrdersByCommandIfIdTypes = {
  commandIfId: string;
  isElse: boolean;
};

export const getCommandIdsAndOrdersByCommandIfIdService = async ({
  commandIfId,
  isElse,
}: GetCommandIdsAndOrdersByCommandIfIdTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });

  const existingIfCommands = await PlotFieldCommand.find({
    commandIfId,
    isElse,
  }).exec();

  if (!existingIfCommands.length) {
    return [];
  }

  return existingIfCommands.map((ic) => {
    return {
      _id: ic._id,
      commandOrder: ic.commandOrder,
    };
  });
};

type GetIfByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getIfByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetIfByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingIf = await IfModel.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingIf) {
    return null;
  }

  return existingIf;
};

type CreateIfDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createIfDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateIfDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  const condition = await IfModel.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });

  await IfValue.create({ plotFieldCommandIfId: condition._id });
  return condition;
};
type CreateIfTypes = {
  plotFieldCommandId: string;
};

export const createIfService = async ({
  plotFieldCommandId,
}: CreateIfTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const condition = await IfModel.create({
    plotFieldCommandId,
  });

  await IfValue.create({ plotFieldCommandIfId: condition._id });
  return condition;
};

type CommandIfOrderUpdateTypes = {
  commandIfId: string;
  newOrder: number;
  plotFieldCommandId: string;
};

export const commandIfUpdateCommandIfOrderService = async ({
  newOrder,
  commandIfId,
  plotFieldCommandId,
}: CommandIfOrderUpdateTypes) => {
  validateMongoId({ value: commandIfId, valueName: "PlotField" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).exec();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "Command with such id wasn't found");
  }

  const oldOrder = existingPlotFieldCommand.commandOrder as number;
  const difference = oldOrder - newOrder;

  if (Math.abs(difference) === 1) {
    const prevPlotFieldCommand = await PlotFieldCommand.findOne({
      commandIfId,
      commandOrder: newOrder,
      isElse: existingPlotFieldCommand.isElse || false,
    }).exec();

    if (!prevPlotFieldCommand) {
      throw createHttpError(
        400,
        "You're trying to transport your command to non-allowed place"
      );
    }

    [prevPlotFieldCommand.commandOrder, existingPlotFieldCommand.commandOrder] =
      [oldOrder, newOrder];

    await Promise.all([
      prevPlotFieldCommand.save(),
      existingPlotFieldCommand.save(),
    ]);

    return existingPlotFieldCommand;
  }

  const rangeQuery =
    oldOrder > newOrder
      ? {
          commandIfId,
          commandOrder: { $gte: newOrder, $lt: oldOrder },
          isElse: existingPlotFieldCommand.isElse || false,
        }
      : {
          commandIfId,
          commandOrder: { $gt: oldOrder, $lte: newOrder },
          isElse: existingPlotFieldCommand.isElse || false,
        };

  const plotFieldCommandsToUpdate = await PlotFieldCommand.find(
    rangeQuery
  ).exec();

  for (const command of plotFieldCommandsToUpdate) {
    if (!command.commandIfId) {
      throw createHttpError(
        400,
        "Transporting from if command inside main plot is not supported, and same for vice versa"
      );
    }
  }

  const bulkOps = plotFieldCommandsToUpdate.map((command) => ({
    updateOne: {
      filter: { _id: command._id },
      update: {
        $set: {
          commandOrder:
            oldOrder > newOrder
              ? (command.commandOrder as number) + 1
              : (command.commandOrder as number) - 1,
        },
      },
    },
  }));

  if (bulkOps.length > 0) {
    await PlotFieldCommand.bulkWrite(bulkOps);
  }

  existingPlotFieldCommand.commandOrder = newOrder;
  return await existingPlotFieldCommand.save();
};

type DeleteIfTypes = {
  ifId: string;
};

export const deleteIfService = async ({ ifId }: DeleteIfTypes) => {
  validateMongoId({ value: ifId, valueName: "If" });

  await IfModel.findByIdAndDelete(ifId);

  const ifValues = await IfValue.find({
    plotFieldCommandIfId: ifId,
  }).exec();
  for (const c of ifValues) {
    await c.deleteOne();
  }

  return `If command with id ${ifId} was removed`;
};
