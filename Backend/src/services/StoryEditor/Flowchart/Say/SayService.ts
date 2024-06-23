import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Say from "../../../../models/StoryEditor/Flowchart/Say/Say";
import { SayType } from "../../../../controllers/StoryEditor/Flowchart/Say/SayController";
import Translation from "../../../../models/StoryData/Translation";

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
  sayId: string;
};

export const updateSayTextService = async ({
  sayId,
  text,
}: UpdateSayTextTypes) => {
  validateMongoId({ value: sayId, valueName: "Say" });

  const existingSay = await Say.findById(sayId).exec();
  if (!existingSay) {
    throw createHttpError(400, "Say with such id wasn't found");
  }

  if (text?.trim().length) {
    existingSay.text = text;

    const existingTranslation = await Translation.findOne({
      commandId: existingSay.flowchartCommandId,
      language: existingSay.currentLanguage,
      textFieldName: "sayText",
    });

    if (existingTranslation) {
      existingTranslation.text = text;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: existingSay.flowchartCommandId,
        language: existingSay.currentLanguage,
        textFieldName: "sayText",
        text,
      });
    }
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
