import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Say from "../../../../models/StoryEditor/Flowchart/Say/Say";
import { SayType } from "../../../../controllers/StoryEditor/Flowchart/Say/SayController";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CreateSayTypes = {
  characterName: string | undefined;
  characterEmotion: string | undefined;
  type: SayType | undefined;
  flowchartCommandId: string;
};

export const createSayService = async ({
  characterEmotion,
  characterName,
  type,
  flowchartCommandId,
}: CreateSayTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (type === "author") {
    return await Say.create({ flowchartCommandId, type: "author" });
  } else if (type === "character") {
    return await Say.create({
      characterName,
      characterEmotion,
      flowchartCommandId,
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

  existingSay.text = text;
  const existingTranslation = await Translation.findById(
    existingSay.translationId
  ).exec();

  if (existingTranslation) {
    existingTranslation.text = text;
    await existingTranslation.save();
  } else {
    const newTranslation = await Translation.create({
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.SayText,
      text,
    });
    existingSay.translationId = newTranslation._id;
  }

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
