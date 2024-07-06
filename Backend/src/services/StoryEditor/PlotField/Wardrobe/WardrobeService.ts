import createHttpError from "http-errors";
import AppearancePart from "../../../../models/StoryData/AppearancePart";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import CommandWardrobe from "../../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobe";
import CommandWardrobeAppearancePart from "../../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobeAppearancePart";
import { validateMongoId } from "../../../../utils/validateMongoId";

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
  appearancePartId: string;
};

export const getCommandWardrobeByAppearancePartIdAndCommandWardrobeIdService =
  async ({
    commandWardrobeId,
    appearancePartId,
  }: GetCommandWardrobeByAppearancePartIdAndCommandWardrobeIdTypes) => {
    validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });
    validateMongoId({ value: appearancePartId, valueName: "AppearancePart" });

    const existingCommandWardrobeAppearancePart =
      await CommandWardrobeAppearancePart.find({
        appearancePartId,
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
  title: string | undefined;
  commandWardrobeId: string;
  isCurrentDressed: boolean | undefined;
};

export const updateCommandWardrobeService = async ({
  title,
  isCurrentDressed,
  commandWardrobeId,
}: UpdateCommandWardrobeTypes) => {
  validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });

  if (!title?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  if (isCurrentDressed === undefined || isCurrentDressed === null) {
    throw createHttpError(400, "isCurrentDressed is required");
  }

  const existingCommandWardrobe = await CommandWardrobe.findById(
    commandWardrobeId
  ).exec();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "CommandWardrobe with such id wasn't found");
  }

  existingCommandWardrobe.isCurrentDressed = isCurrentDressed;

  return existingCommandWardrobe;
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
