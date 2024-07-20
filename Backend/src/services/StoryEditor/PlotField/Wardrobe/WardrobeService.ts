import createHttpError from "http-errors";
import AppearancePart from "../../../../models/StoryData/AppearancePart";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import CommandWardrobe from "../../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobe";
import CommandWardrobeAppearancePart from "../../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobeAppearancePart";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { Types } from "mongoose";

type GetCommandWardrobeByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getCommandWardrobeByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetCommandWardrobeByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingCommandWardrobe = await CommandWardrobe.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingCommandWardrobe) {
    return null;
  }

  return existingCommandWardrobe;
};

type GetCommandWardrobeByAppearancePartIdAndCommandWardrobeIdTypes = {
  commandWardrobeId: string;
};

export const getCommandWardrobeByAppearancePartIdAndCommandWardrobeIdService =
  async ({
    commandWardrobeId,
  }: GetCommandWardrobeByAppearancePartIdAndCommandWardrobeIdTypes) => {
    validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });

    const existingCommandWardrobeAppearancePart =
      await CommandWardrobeAppearancePart.find({
        commandWardrobeId,
      }).lean();

    if (!existingCommandWardrobeAppearancePart.length) {
      return [];
    }

    return existingCommandWardrobeAppearancePart;
  };

type CreateCommandWardrobeTypes = {
  plotFieldCommandId: string;
};

export const createCommandWardrobeService = async ({
  plotFieldCommandId,
}: CreateCommandWardrobeTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await CommandWardrobe.create({
    plotFieldCommandId,
  });
};

type UpdateCommandWardrobeTypes = {
  commandWardrobeId: string;
  isCurrentDressed: boolean | undefined;
  characterId: string | undefined;
};

export const updateCommandWardrobeService = async ({
  characterId,
  isCurrentDressed,
  commandWardrobeId,
}: UpdateCommandWardrobeTypes) => {
  validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });

  const existingCommandWardrobe = await CommandWardrobe.findById(
    commandWardrobeId
  ).exec();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "CommandWardrobe with such id wasn't found");
  }

  if (isCurrentDressed) {
    existingCommandWardrobe.isCurrentDressed = isCurrentDressed;
  }

  if (characterId?.trim().length) {
    validateMongoId({ value: characterId, valueName: "Character" });
    existingCommandWardrobe.characterId = new Types.ObjectId(characterId);
  }

  return await existingCommandWardrobe.save();
};

type CreateCommandWardrobeAppearanceTypeTypes = {
  appearancePartId: string;
  commandWardrobeId: string;
};

export const createCommandWardrobeAppearancePartService = async ({
  appearancePartId,
  commandWardrobeId,
}: CreateCommandWardrobeAppearanceTypeTypes) => {
  validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });
  validateMongoId({ value: appearancePartId, valueName: "AppearancePart" });

  const existingCommandWardrobe = await CommandWardrobe.findById(
    commandWardrobeId
  ).lean();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "CommandWardrobe with such id wasn't found");
  }
  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).lean();

  if (!existingAppearancePart) {
    throw createHttpError(400, "AppearancePart with such id wasn't found");
  }

  const alreadyExistingBlock = await CommandWardrobeAppearancePart.findOne({
    commandWardrobeId,
    appearancePartId,
  }).lean();

  if (alreadyExistingBlock) {
    return alreadyExistingBlock;
  }

  return await CommandWardrobeAppearancePart.create({
    appearancePartId,
    commandWardrobeId,
  });
};

type DeleteCommandWardrobeTypes = {
  commandWardrobeId: string;
};

export const deleteCommandWardrobeService = async ({
  commandWardrobeId,
}: DeleteCommandWardrobeTypes) => {
  validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });

  await CommandWardrobe.findByIdAndDelete(commandWardrobeId);

  const appearanceParts = await CommandWardrobeAppearancePart.find({
    commandWardrobeId,
  }).exec();
  for (const a of appearanceParts) {
    await a.deleteOne();
  }

  return `CommandWardrobe with id ${commandWardrobeId} was removed`;
};
