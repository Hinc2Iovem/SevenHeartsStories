import createHttpError from "http-errors";
import Wait from "../../../../models/StoryEditor/PlotField/Wait/Wait";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetWaitByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getWaitByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetWaitByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingWait = await Wait.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingWait) {
    return null;
  }

  return existingWait;
};

type CreateWaitDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createWaitDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateWaitDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await Wait.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};
type CreateWaitTypes = {
  plotFieldCommandId: string;
};

export const createWaitService = async ({
  plotFieldCommandId,
}: CreateWaitTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Wait.create({
    plotFieldCommandId,
  });
};

type UpdateWaitTypes = {
  waitValue: number | undefined;
  waitId: string;
};

export const updateWaitService = async ({
  waitValue,
  waitId,
}: UpdateWaitTypes) => {
  validateMongoId({ value: waitId, valueName: "Wait" });

  const existingWait = await Wait.findById(waitId).exec();
  if (!existingWait) {
    throw createHttpError(400, "Wait with such id wasn't found");
  }

  if (!waitValue) {
    throw createHttpError(400, "WaitValue is required");
  }

  existingWait.waitValue = waitValue;

  return await existingWait.save();
};

type DeleteWaitTypes = {
  waitId: string;
};

export const deleteWaitService = async ({ waitId }: DeleteWaitTypes) => {
  validateMongoId({ value: waitId, valueName: "Wait" });

  await Wait.findByIdAndDelete(waitId);

  return `Wait with id ${waitId} was rewaitd`;
};
