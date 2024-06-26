import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Say from "../../../../models/StoryEditor/PlotField/Say/Say";
import { SayType } from "../../../../controllers/StoryEditor/PlotField/Say/SayController";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CreateSayTypes = {
  characterName: string | undefined;
  characterEmotion: string | undefined;
  type: SayType | undefined;
  plotFieldCommandId: string;
};

export const createSayService = async ({
  characterEmotion,
  characterName,
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

  if (type === "author") {
    return await Say.create({ plotFieldCommandId, type: "author" });
  } else if (type === "character") {
    return await Say.create({
      characterName,
      characterEmotion,
      plotFieldCommandId,
      type: "character",
    });
  }
};

type UpdateSayTextTypes = {
  text: string | undefined;
  currentLanguage: string | undefined;
  sayId: string;
};

export const updateSayTextService = async ({
  sayId,
  text,
  currentLanguage,
}: UpdateSayTextTypes) => {
  validateMongoId({ value: sayId, valueName: "Say" });

  const existingSay = await Say.findById(sayId).exec();
  if (!existingSay) {
    throw createHttpError(400, "Say with such id wasn't found");
  }

  if (!text?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Text and currentLanguage are required");
  }

  const existingTranslation = await Translation.findOne({
    commandId: existingSay._id,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.SayText,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = text;
    await existingTranslation.save();
  } else {
    await Translation.create({
      commandId: existingSay._id,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.SayText,
      text,
    });
  }

  return existingSay;
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
