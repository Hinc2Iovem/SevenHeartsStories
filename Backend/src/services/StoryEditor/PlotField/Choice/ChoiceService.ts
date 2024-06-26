import createHttpError from "http-errors";
import { ChoiceType } from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";
import Choice from "../../../../models/StoryEditor/PlotField/Choice/Choice";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { Types } from "mongoose";

type CreateChoiceTypes = {
  plotFieldCommandId: string;
};

export const createChoiceService = async ({
  plotFieldCommandId,
}: CreateChoiceTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await Choice.create({
    plotFieldCommandId,
  });
};

type UpdateChoiceTypes = {
  choiceQuestion: string | undefined;
  currentLanguage: string | undefined;
  choiceId: string;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
  exitBlockId: string;
};

export const updateChoiceService = async ({
  choiceQuestion,
  choiceId,
  choiceType,
  currentLanguage,
  timeLimit,
  exitBlockId,
}: UpdateChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  if (!choiceQuestion?.trim().length) {
    throw createHttpError(400, "Choice Question is required");
  }

  const existingTranslation = await Translation.findOne({
    textFieldName: TranslationTextFieldName.ChoiceQuestion,
    language: currentLanguage,
    commandId: choiceId,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = choiceQuestion;
    await existingTranslation.save();
  } else {
    await Translation.create({
      commandId: choiceId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.ChoiceQuestion,
      text: choiceQuestion,
    });
  }

  if (choiceType) {
    existingChoice.choiceType = choiceType;
    if (choiceType === "timelimit") {
      existingChoice.timeLimit = timeLimit;
    } else if (choiceType === "multiple") {
      validateMongoId({ value: exitBlockId, valueName: "ExitBlock" });
      existingChoice.exitBlockId = new Types.ObjectId(exitBlockId);
    }
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
