import createHttpError from "http-errors";
import IfModel from "../../../../models/StoryEditor/PlotField/If/IfModel";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import IfValue from "../../../../models/StoryEditor/PlotField/If/IfValue";

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
  if (!existingPlotFieldCommand?.commandIfId) {
    throw createHttpError(
      400,
      "Transporting from if command inside main plot is not supported, and same for vice versa"
    );
  }

  const oldOrder = existingPlotFieldCommand.commandOrder as number;

  const difference = oldOrder - newOrder;

  if (difference === 1 || difference === -1) {
    const prevPlotfieldCommand = await PlotFieldCommand.findOne({
      commandIfId,
      commandOrder: newOrder,
    }).exec();
    if (!prevPlotfieldCommand?.commandIfId) {
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
          commandIfId,
          commandOrder: i,
        }).exec();
        if (!plotFieldCommand?.commandIfId) {
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
          commandIfId,
          commandOrder: i,
        }).exec();
        if (!plotFieldCommand?.commandIfId) {
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

// type AddAnotherValueBlockTypes = {
//   commandIfId: string;
// };

// export const addAnotherBlockIfService = async ({
//   commandIfId,
// }: AddAnotherValueBlockTypes) => {
//   validateMongoId({ value: commandIfId, valueName: "CommandIf" });

//   const existingCommandIfId = await IfModel.findById(commandIfId).lean();
//   if (!existingCommandIfId) {
//     throw createHttpError(400, "CommandIfId with such id wasn't found");
//   }

//   return await IfValue.create({ plotFieldCommandIfId: commandIfId });
// };

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
