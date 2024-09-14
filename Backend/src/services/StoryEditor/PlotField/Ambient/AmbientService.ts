import createHttpError from "http-errors";
import Ambient from "../../../../models/StoryEditor/PlotField/Ambient/Ambient";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetAmbientByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getAmbientByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetAmbientByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingAmbient = await Ambient.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingAmbient) {
    return null;
  }

  return existingAmbient;
};

type CreateAmbientTypes = {
  plotFieldCommandId: string;
};

export const createAmbientService = async ({
  plotFieldCommandId,
}: CreateAmbientTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Ambient.create({
    plotFieldCommandId,
  });
};

type CreateAmbientDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createAmbientDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateAmbientDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await Ambient.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};

type UpdateAmbientTypes = {
  ambientName: string | undefined;
  ambientId: string;
};

export const updateAmbientService = async ({
  ambientId,
  ambientName,
}: UpdateAmbientTypes) => {
  validateMongoId({ value: ambientId, valueName: "Ambient" });

  const existingAmbient = await Ambient.findById(ambientId).exec();
  if (!existingAmbient) {
    throw createHttpError(400, "Ambient with such id wasn't found");
  }

  if (!ambientName?.trim().length) {
    throw createHttpError(400, "Ambient is required");
  }

  existingAmbient.ambientName = ambientName;

  return await existingAmbient.save();
};

type DeleteAmbientTypes = {
  ambientId: string;
};

export const deleteAmbientService = async ({
  ambientId,
}: DeleteAmbientTypes) => {
  validateMongoId({ value: ambientId, valueName: "Ambient" });

  await Ambient.findByIdAndDelete(ambientId);

  return `Ambient with id ${ambientId} was removed`;
};
