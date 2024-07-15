import createHttpError from "http-errors";
import { SayType } from "../../../../controllers/StoryEditor/PlotField/Say/SayController";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Say from "../../../../models/StoryEditor/PlotField/Say/Say";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { Types } from "mongoose";

type GetSayByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getSayByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetSayByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingSay = await Say.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingSay) {
    return null;
  }

  return existingSay;
};

type CreateSayTypes = {
  characterId: string;
  characterEmotionId: string;
  type: SayType | undefined;
  plotFieldCommandId: string;
};

const AllPossibleTypeVariations = ["author", "character", "hint", "notify"];

export const createSayService = async ({
  characterEmotionId,
  characterId,
  type,
  plotFieldCommandId,
}: CreateSayTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!AllPossibleTypeVariations.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      `Such type isn't supported, possible types: ${AllPossibleTypeVariations.map(
        (tv) => tv
      )}`
    );
  }

  if (type?.toLowerCase() === "author") {
    return await Say.create({ plotFieldCommandId, type: "author" });
  } else if (type?.toLowerCase() === "character") {
    validateMongoId({ value: characterId, valueName: "Character" });
    validateMongoId({
      value: characterEmotionId,
      valueName: "CharacterEmotion",
    });
    return await Say.create({
      characterId,
      characterEmotionId,
      plotFieldCommandId,
      type: "character",
    });
  } else if (type?.toLowerCase() === "notify") {
    return await Say.create({ plotFieldCommandId, type: "notify" });
  } else if (type?.toLowerCase() === "hint") {
    return await Say.create({ plotFieldCommandId, type: "hint" });
  }
};

type CreateSayBlankTypes = {
  characterId: string;
  type: SayType | undefined;
  plotFieldCommandId: string;
};

export const createSayBlankService = async ({
  characterId,
  type,
  plotFieldCommandId,
}: CreateSayBlankTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!AllPossibleTypeVariations.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      `Such type isn't supported, possible types: ${AllPossibleTypeVariations.map(
        (tv) => tv
      )}`
    );
  }

  if (type?.toLowerCase() === "author") {
    return await Say.create({ plotFieldCommandId, type: "author" });
  } else if (type?.toLowerCase() === "character") {
    validateMongoId({ value: characterId, valueName: "Character" });
    return await Say.create({
      characterId,
      plotFieldCommandId,
      type: "character",
    });
  } else if (type?.toLowerCase() === "notify") {
    return await Say.create({ plotFieldCommandId, type: "notify" });
  } else if (type?.toLowerCase() === "hint") {
    return await Say.create({ plotFieldCommandId, type: "hint" });
  }
};

type UpdateSayTypes = {
  characterId: string;
  characterEmotionId: string;
  sayId: string;
};

export const updateSayService = async ({
  characterEmotionId,
  characterId,
  sayId,
}: UpdateSayTypes) => {
  validateMongoId({ value: sayId, valueName: "Say" });

  const existingSay = await Say.findById(sayId).exec();
  if (!existingSay) {
    throw createHttpError(400, "Say with such id wasn't found");
  }

  if (characterEmotionId?.trim().length) {
    existingSay.characterEmotionId = new Types.ObjectId(characterEmotionId);
  }
  if (characterId?.trim().length) {
    existingSay.characterId = new Types.ObjectId(characterId);
  }

  return await existingSay.save();
};

type UpdateSayCommandSideTypes = {
  commandSide: string | undefined;
  sayId: string;
};

export const updateSayCommandSideService = async ({
  sayId,
  commandSide,
}: UpdateSayCommandSideTypes) => {
  validateMongoId({ value: sayId, valueName: "Say" });

  const existingSay = await Say.findById(sayId).exec();
  if (!existingSay) {
    throw createHttpError(400, "Say with such id wasn't found");
  }

  if (!commandSide?.trim().length) {
    throw createHttpError(400, "commandSide is required");
  }

  existingSay.commandSide = commandSide;

  return await existingSay.save();
};

type DeleteSayTypes = {
  sayId: string;
};

export const deleteSayService = async ({ sayId }: DeleteSayTypes) => {
  validateMongoId({ value: sayId, valueName: "Say" });

  await Say.findByIdAndDelete(sayId);

  return `Say with id ${sayId} was removed`;
};
