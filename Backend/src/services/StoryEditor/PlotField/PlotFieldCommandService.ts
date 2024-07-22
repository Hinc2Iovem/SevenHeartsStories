import createHttpError from "http-errors";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../utils/validateMongoId";

type GetAllPlotFieldCommandsByIfIdTypes = {
  commandIfId: string;
};

export const getAllPlotFieldCommandsByIfIdService = async ({
  commandIfId,
}: GetAllPlotFieldCommandsByIfIdTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });

  const existingCommands = await PlotFieldCommand.find({
    commandIfId,
    isElse: false,
  }).lean();

  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

export const getAllPlotFieldCommandsByIfIdInsideElseService = async ({
  commandIfId,
}: GetAllPlotFieldCommandsByIfIdTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });

  const existingCommands = await PlotFieldCommand.find({
    commandIfId,
    isElse: true,
  }).lean();

  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

type GetAllPlotFieldCommandsTypes = {
  topologyBlockId: string;
};

export const getAllPlotFieldCommandsService = async ({
  topologyBlockId,
}: GetAllPlotFieldCommandsTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingCommands = await PlotFieldCommand.find({
    topologyBlockId,
    commandIfId: null || undefined,
  }).lean();
  if (!existingCommands.length) {
    return [];
  }

  return existingCommands;
};

type PlotFieldCommandCreateInsideIfBlockTypes = {
  commandIfId: string;
  topologyBlockId: string;
  isElse?: boolean;
};

export const plotFieldCommandCreateInsideIfBlockService = async ({
  commandIfId,
  topologyBlockId,
  isElse,
}: PlotFieldCommandCreateInsideIfBlockTypes) => {
  validateMongoId({ value: commandIfId, valueName: "CommandIf" });
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingPlotFieldCommands = await PlotFieldCommand.find({
    commandIfId,
    isElse: isElse ? isElse : false,
  }).countDocuments();

  const commandOrder = existingPlotFieldCommands
    ? existingPlotFieldCommands
    : 0;

  if (isElse) {
    return await PlotFieldCommand.create({
      commandIfId,
      commandOrder,
      topologyBlockId,
      isElse,
    });
  } else {
    return await PlotFieldCommand.create({
      commandIfId,
      commandOrder,
      topologyBlockId,
    });
  }
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
    commandIfId: { $exists: false },
  }).countDocuments();

  const commandOrder = existingPlotFieldCommands
    ? existingPlotFieldCommands
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

  const oldOrder = existingPlotFieldCommand.commandOrder as number;

  const difference = oldOrder - newOrder;

  if (existingPlotFieldCommand?.commandIfId) {
    throw createHttpError(
      400,
      "Transporting from if command inside main plot is not supported, and same for vice versa"
    );
  }

  if (difference === 1 || difference === -1) {
    const prevPlotfieldCommand = await PlotFieldCommand.findOne({
      topologyBlockId,
      commandOrder: newOrder,
    }).exec();
    if (prevPlotfieldCommand?.commandIfId) {
      throw createHttpError(
        400,
        "Transporting from if command inside main plot is not supported, and same for vice versa"
      );
    }
    if (prevPlotfieldCommand) {
      prevPlotfieldCommand.commandOrder = oldOrder;
      await prevPlotfieldCommand.save();
    }
    existingPlotFieldCommand.commandOrder = newOrder;
  } else {
    const allPlotFieldCommandIds = [];
    if (oldOrder > newOrder) {
      for (let i = newOrder; i < oldOrder; i++) {
        const plotFieldCommand = await PlotFieldCommand.findOne({
          topologyBlockId,
          commandOrder: i,
        }).exec();
        if (plotFieldCommand?.commandIfId) {
          throw createHttpError(
            400,
            "Transporting from if command inside main plot is not supported, and same for vice versa"
          );
        }
        if (plotFieldCommand) {
          allPlotFieldCommandIds.push(plotFieldCommand._id);
        }
      }
      for (const plotFieldCommandId of allPlotFieldCommandIds) {
        const plotFieldCommand = await PlotFieldCommand.findById(
          plotFieldCommandId
        ).exec();
        if (plotFieldCommand) {
          plotFieldCommand.commandOrder =
            (plotFieldCommand.commandOrder as number) + 1;
          await plotFieldCommand.save();
        }
      }
    } else {
      for (let i = oldOrder + 1; i <= newOrder; i++) {
        const plotFieldCommand = await PlotFieldCommand.findOne({
          topologyBlockId,
          commandOrder: i,
        }).exec();
        if (plotFieldCommand?.commandIfId) {
          throw createHttpError(
            400,
            "Transporting from if command inside main plot is not supported, and same for vice versa"
          );
        }
        if (plotFieldCommand) {
          allPlotFieldCommandIds.push(plotFieldCommand._id);
        }
      }

      for (const plotFieldCommandId of allPlotFieldCommandIds) {
        const plotFieldCommand = await PlotFieldCommand.findById(
          plotFieldCommandId
        ).exec();
        if (plotFieldCommand) {
          plotFieldCommand.commandOrder =
            (plotFieldCommand.commandOrder as number) - 1;
          await plotFieldCommand.save();
        }
      }
    }

    existingPlotFieldCommand.commandOrder = newOrder;
  }

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
