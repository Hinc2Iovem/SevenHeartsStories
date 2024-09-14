import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import { AllChoiceVariations } from "../../../../consts/CHOICE_OPTION_TYPES";
import { ChoiceType } from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";
import Choice from "../../../../models/StoryEditor/PlotField/Choice/Choice";
import { validateMongoId } from "../../../../utils/validateMongoId";
import ChoiceOption from "../../../../models/StoryEditor/PlotField/Choice/ChoiceOption";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TranslationChoice from "../../../../models/StoryData/Translation/TranslationChoice";

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

type UpdateChoiceTypes = {
  choiceId: string;
  timeLimit: number | undefined;
  choiceType: ChoiceType | undefined;
  exitBlockId: string | undefined;
  characterId: string | undefined;
  optionOrder: number | undefined;
  characterEmotionId: string | undefined;
};

export const updateChoiceService = async ({
  choiceId,
  choiceType,
  timeLimit,
  exitBlockId,
  characterId,
  optionOrder,
  characterEmotionId,
}: UpdateChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  if (characterId?.trim().length) {
    validateMongoId({ value: characterId, valueName: "Character" });
    existingChoice.characterId = new Types.ObjectId(characterId);
  }
  if (characterEmotionId?.trim().length) {
    validateMongoId({
      value: characterEmotionId,
      valueName: "CharacterEmotion",
    });
    existingChoice.characterEmotionId = new Types.ObjectId(characterEmotionId);
  }

  if (choiceType?.trim().length) {
    existingChoice.choiceType = choiceType.toLowerCase();
    if (choiceType.toLowerCase() === "timelimit") {
      if (timeLimit) {
        existingChoice.timeLimit = timeLimit;
      }
      if (typeof optionOrder === "number") {
        const existingChoiceOption = await ChoiceOption.findOne({
          plotFieldCommandChoiceId: choiceId,
          optionOrder,
        });
        existingChoice.timeLimitDefaultOptionId = existingChoiceOption?._id;
      }
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

type UpdateChoiceIsAuthorTypes = {
  choiceId: string;
  isAuthor: boolean | undefined;
};

export const updateChoiceIsAuthorService = async ({
  choiceId,
  isAuthor,
}: UpdateChoiceIsAuthorTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  if (isAuthor || !isAuthor) {
    console.log("inside If IsAuthor: ", isAuthor);

    if (isAuthor === true) {
      console.log("inside If IsAuthor True: ", isAuthor);

      existingChoice.characterId = null;
      existingChoice.characterEmotionId = null;
      existingChoice.isAuthor = true;
    } else {
      console.log("inside If IsAuthor False: ", isAuthor);
      existingChoice.isAuthor = false;
    }
  }

  return await existingChoice.save();
};

type CreateChoiceDuplicateTypes = {
  topologyBlockId: string;
  isAuthor: boolean | undefined;
  choiceType?: string;
  exitBlockId?: string;
  characterId?: string;
  characterEmotionId?: string;
  timeLimitDefaultOptionId?: string;
  timeLimit?: number;
  amountOfOptions?: number;
  commandOrder?: number;
};

export const createChoiceDuplicateService = async ({
  topologyBlockId,
  isAuthor,
  amountOfOptions,
  characterEmotionId,
  characterId,
  choiceType,
  commandOrder,
  exitBlockId,
  timeLimit,
  timeLimitDefaultOptionId,
}: CreateChoiceDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    command: "choice",
    commandOrder: commandOrder + 1,
    topologyBlockId,
  });

  const duplicatedChoice = await Choice.create({
    amountOfOptions,
    choiceType,
    plotFieldCommandId: newPlotfieldCommand._id,
  });

  if (isAuthor) {
    duplicatedChoice.isAuthor = isAuthor;
  } else if (!isAuthor || characterId || characterEmotionId) {
    duplicatedChoice.isAuthor = false;
    if (characterId) {
      duplicatedChoice.characterId = new Types.ObjectId(characterId);
    }
    if (characterEmotionId) {
      duplicatedChoice.characterEmotionId = new Types.ObjectId(
        characterEmotionId
      );
    }
  }

  if (choiceType === "timelimit") {
    if (timeLimit) {
      duplicatedChoice.timeLimit = timeLimit;
    }
    if (timeLimitDefaultOptionId) {
      duplicatedChoice.timeLimitDefaultOptionId = new Types.ObjectId(
        timeLimitDefaultOptionId
      );
    }
  } else if (choiceType === "multiple") {
    if (exitBlockId) {
      duplicatedChoice.exitBlockId = new Types.ObjectId(exitBlockId);
    }
  }

  await TranslationChoice.create({
    commandId: newPlotfieldCommand._id,
    language: "russian",
    topologyBlockId,
    translations: [],
  });

  return await duplicatedChoice.save();
};

type DeleteChoiceTypes = {
  choiceId: string;
};

export const deleteChoiceService = async ({ choiceId }: DeleteChoiceTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  await Choice.findByIdAndDelete(choiceId);

  return `Choice with id ${choiceId} was removed`;
};
