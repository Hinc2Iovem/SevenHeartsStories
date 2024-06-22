import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import CommandWardrobe from "../../../../models/StoryEditor/Flowchart/Wardrobe/CommandWardrobe";
import CommandWardrobeAppearancePart from "../../../../models/StoryEditor/Flowchart/Wardrobe/CommandWardrobeAppearancePart";
import AppearancePart from "../../../../models/StoryData/AppearancePart";

type CreateCommandWardrobeTypes = {
  flowchartCommandId: string;
};

export const createCommandWardrobeService = async ({
  flowchartCommandId,
}: CreateCommandWardrobeTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await CommandWardrobe.create({
    flowchartCommandId,
  });
};

type UpdateCommandWardrobeTypes = {
  title: string | undefined;
  commandWardrobeId: string;
};

export const updateCommandWardrobeService = async ({
  title,
  commandWardrobeId,
}: UpdateCommandWardrobeTypes) => {
  validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });

  const existingCommandWardrobe = await CommandWardrobe.findById(
    commandWardrobeId
  ).exec();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "CommandWardrobe with such id wasn't found");
  }

  if (!title?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  existingCommandWardrobe.title = title;

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
