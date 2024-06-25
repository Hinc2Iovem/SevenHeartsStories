import createHttpError from "http-errors";
import { ChoiceType } from "../../../../controllers/StoryEditor/Flowchart/Choice/ChoiceController";
import Choice from "../../../../models/StoryEditor/Flowchart/Choice/Choice";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CreateChoiceTypes = {
  flowchartCommandId: string;
};

export const createChoiceService = async ({
  flowchartCommandId,
}: CreateChoiceTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await Choice.create({
    flowchartCommandId,
  });
};

type UpdateChoiceTypes = {
  choiceQuestion: string | undefined;
  currentLanguage: string | undefined;
  choiceId: string;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
};

export const updateChoiceService = async ({
  choiceQuestion,
  choiceId,
  choiceType,
  currentLanguage,
  timeLimit,
}: UpdateChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  if (!choiceQuestion?.trim().length) {
    throw createHttpError(400, "Choice Question is required");
  }

  const existingTranslation = await Translation.findById(
    existingChoice._id
  ).exec();

  if (existingTranslation) {
    existingTranslation.text = choiceQuestion;
    await existingTranslation.save();
  } else {
    const newTranslation = await Translation.create({
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.ChoiceQuestion,
      text: choiceQuestion,
    });
    existingChoice.translationId = newTranslation._id;
  }

  if (choiceType === "timelimit") {
    existingChoice.choiceQuestion = choiceQuestion;
    existingChoice.choiceType = choiceType;
    existingChoice.timeLimit = timeLimit;
  } else if (choiceType === "common" || choiceType === "multiple") {
    existingChoice.choiceQuestion = choiceQuestion;
    existingChoice.choiceType = choiceType;
  }

  return await existingChoice.save();
};

type DeleteChoiceTypes = {
  choiceId: string;
};

export const deleteChoiceService = async ({ choiceId }: DeleteChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  await Choice.findByIdAndDelete(choiceId);

  return `Choice with id ${choiceId} was removed`;
};
