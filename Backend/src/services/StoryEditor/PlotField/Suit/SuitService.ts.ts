import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Suit from "../../../../models/StoryEditor/PlotField/Suit/Suit";
import Character from "../../../../models/StoryData/Character";
import { Types } from "mongoose";

type GetSuitByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getSuitByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetSuitByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingSuit = await Suit.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingSuit) {
    return null;
  }

  return existingSuit;
};

type CreateSuitTypes = {
  plotFieldCommandId: string;
};

export const createSuitService = async ({
  plotFieldCommandId,
}: CreateSuitTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Suit.create({
    plotFieldCommandId,
  });
};

type CreateSuitDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createSuitDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateSuitDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await Suit.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};

type UpdateSuitTypes = {
  suitName: string | undefined;
  characterId: string;
  suitId: string;
};

export const updateSuitService = async ({
  suitName,
  suitId,
  characterId,
}: UpdateSuitTypes) => {
  validateMongoId({ value: suitId, valueName: "Suit" });
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingSuit = await Suit.findById(suitId).exec();
  if (!existingSuit) {
    throw createHttpError(400, "Suit with such id wasn't found");
  }

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id wasn't found");
  }

  if (!suitName?.trim().length) {
    throw createHttpError(400, "Suit is required");
  }

  existingSuit.suitName = suitName;
  existingSuit.characterId = new Types.ObjectId(characterId);

  return await existingSuit.save();
};

type DeleteSuitTypes = {
  suitId: string;
};

export const deleteSuitService = async ({ suitId }: DeleteSuitTypes) => {
  validateMongoId({ value: suitId, valueName: "Suit" });

  await Suit.findByIdAndDelete(suitId);

  return `Suit with id ${suitId} was removed`;
};
