import createHttpError from "http-errors";
import { Types } from "mongoose";
import { AllChoiceVariations } from "../../../../consts/CHOICE_OPTION_TYPES";
import { ChoiceType } from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";
import { validateMongoId } from "../../../../utils/validateMongoId";
import Choice from "../../../../models/StoryEditor/PlotField/Choice/Choice";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";

type GetChoiceByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getChoiceByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetChoiceByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingChoice = await Choice.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingChoice) {
    return null;
  }

  return existingChoice;
};

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
  choiceId: string;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
  exitBlockId: string | undefined;
  characterId: string | undefined;
  characterEmotionId: string | undefined;
  isAuthor: boolean | undefined;
};

export const updateChoiceService = async ({
  choiceId,
  choiceType,
  timeLimit,
  exitBlockId,
  isAuthor,
  characterId,
  characterEmotionId,
}: UpdateChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }
  if (isAuthor === true) {
    existingChoice.characterId = null;
    existingChoice.characterEmotionId = null;
    existingChoice.isAuthor = true;
  } else {
    existingChoice.isAuthor = false;

    if (characterId?.trim().length) {
      validateMongoId({ value: characterId, valueName: "Character" });
      existingChoice.characterId = new Types.ObjectId(characterId);
    }
    if (characterEmotionId?.trim().length) {
      validateMongoId({
        value: characterEmotionId,
        valueName: "CharacterEmotion",
      });
      existingChoice.characterEmotionId = new Types.ObjectId(
        characterEmotionId
      );
    }
  }

  if (choiceType) {
    existingChoice.choiceType = choiceType.toLowerCase();
    if (choiceType.toLowerCase() === "timelimit") {
      existingChoice.timeLimit = timeLimit;
    } else if (choiceType.toLowerCase() === "multiple") {
      validateMongoId({ value: exitBlockId, valueName: "ExitBlock" });
      existingChoice.exitBlockId = new Types.ObjectId(exitBlockId);
    }
  }

  return await existingChoice.save();
};

type UpdateChoiceTypeTypes = {
  choiceId: string;
  choiceType: ChoiceType | undefined;
};

export const updateChoiceTypeService = async ({
  choiceId,
  choiceType,
}: UpdateChoiceTypeTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  if (!choiceType?.trim().length) {
    throw createHttpError(400, "Choice Type is required");
  }

  if (!AllChoiceVariations.includes(choiceType.toLowerCase())) {
    throw createHttpError(
      400,
      `Unexpected choice type, possible types: ${AllChoiceVariations.map(
        (c) => c
      )}`
    );
  }

  existingChoice.choiceType = choiceType.toLowerCase();
  return await existingChoice.save();
};

type UpdateChoiceTextTypes = {
  choiceId: string;
  isAuthor: boolean | undefined;
  characterId: string | undefined;
  characterEmotionId: string | undefined;
};

export const updateChoiceTextService = async ({
  choiceId,
  characterEmotionId,
  characterId,
  isAuthor,
}: UpdateChoiceTextTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  if (isAuthor) {
    existingChoice.characterId = null;
    existingChoice.characterEmotionId = null;
    existingChoice.isAuthor = true;
  } else {
    existingChoice.isAuthor = false;
    if (characterId?.trim().length) {
      validateMongoId({ value: characterId, valueName: "Character" });
      existingChoice.characterId = new Types.ObjectId(characterId);
    }
    if (characterEmotionId?.trim().length) {
      validateMongoId({
        value: characterEmotionId,
        valueName: "CharacterEmotion",
      });
      existingChoice.characterEmotionId = new Types.ObjectId(
        characterEmotionId
      );
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
