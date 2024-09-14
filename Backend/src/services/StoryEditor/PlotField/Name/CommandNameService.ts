import createHttpError from "http-errors";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";
import Name from "../../../../models/StoryEditor/PlotField/Name/Name";
import { Types } from "mongoose";

type GetNameByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getNameByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetNameByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingName = await Name.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingName) {
    return null;
  }

  return existingName;
};

type CreateNameTypes = {
  plotFieldCommandId: string;
};

export const createNameService = async ({
  plotFieldCommandId,
}: CreateNameTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Name.create({
    plotFieldCommandId,
  });
};

type CreateNameDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createNameDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateNameDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await Name.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};

type UpdateNameTypes = {
  newName: string | undefined;
  nameId: string;
  characterId: string;
};

export const updateNameService = async ({
  newName,
  nameId,
  characterId,
}: UpdateNameTypes) => {
  validateMongoId({ value: nameId, valueName: "Name" });

  const existingName = await Name.findById(nameId).exec();

  if (!existingName) {
    throw createHttpError(400, "No such Name Command");
  }

  if (newName?.trim().length) {
    existingName.name = newName;
  }
  if (characterId?.trim().length) {
    validateMongoId({ value: characterId, valueName: "Character" });
    existingName.characterId = new Types.ObjectId(characterId);
  }
  return await existingName.save();
};

type DeleteNameTypes = {
  nameId: string;
};

export const deleteNameService = async ({ nameId }: DeleteNameTypes) => {
  validateMongoId({ value: nameId, valueName: "Name" });

  await Name.findByIdAndDelete(nameId);

  return `Name with id ${nameId} was removed`;
};
