import createHttpError from "http-errors";
import { Types } from "mongoose";
import { SexualOrientationTypes } from "../../../../consts/SEXUAL_ORIENTATION";
import { ChoiceOptionType } from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceOptionController";
import Translation from "../../../../models/StoryData/Translation/Translation";
import TranslationChoiceOption from "../../../../models/StoryData/Translation/TranslationChoiceOption";
import Choice from "../../../../models/StoryEditor/PlotField/Choice/Choice";
import ChoiceOption from "../../../../models/StoryEditor/PlotField/Choice/ChoiceOption";
import OptionCharacteristic from "../../../../models/StoryEditor/PlotField/Choice/OptionCharacteristic";
import OptionPremium from "../../../../models/StoryEditor/PlotField/Choice/OptionPremium";
import OptionRelationship from "../../../../models/StoryEditor/PlotField/Choice/OptionRelationship";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { checkChoiceOptionType } from "../../../../utils/checkChoiceOptionType";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetChoiceOptionByIdTypes = {
  choiceOptionId: string;
};

export const getChoiceOptionByIdService = async ({
  choiceOptionId,
}: GetChoiceOptionByIdTypes) => {
  validateMongoId({
    value: choiceOptionId,
    valueName: "ChoiceOption",
  });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).lean();

  if (!existingChoiceOption) {
    return null;
  }

  return existingChoiceOption;
};

type GetAllChoiceOptionsByChoiceIdTypes = {
  plotFieldCommandChoiceId: string;
};

export const getAllChoiceOptionsByChoiceIdService = async ({
  plotFieldCommandChoiceId,
}: GetAllChoiceOptionsByChoiceIdTypes) => {
  validateMongoId({
    value: plotFieldCommandChoiceId,
    valueName: "PlotFieldCommandChoice",
  });

  const existingChoiceOption = await ChoiceOption.find({
    plotFieldCommandChoiceId,
  }).lean();

  if (!existingChoiceOption.length) {
    return [];
  }

  return existingChoiceOption;
};

type UpdateChoiceOptionTopologyBlock = {
  choiceOptionId: string;
  targetBlockId: string;
  sourceBlockId: string;
};

export const updateChoiceOptionTopologyBlockService = async ({
  choiceOptionId,
  targetBlockId,
  sourceBlockId,
}: UpdateChoiceOptionTopologyBlock) => {
  validateMongoId({
    value: choiceOptionId,
    valueName: "ChoiceOption",
  });
  validateMongoId({
    value: targetBlockId,
    valueName: "TargetBlock",
  });

  validateMongoId({
    value: sourceBlockId,
    valueName: "SourceBlock",
  });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Such ChoiceOption does not exist");
  }

  const existingTopologyBlock = await TopologyBlock.findById(
    targetBlockId
  ).lean();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "Such TopologyBlock does not exist");
  }

  if (existingChoiceOption.topologyBlockId) {
    const existingTopologyConnection = await TopologyBlockConnection.findOne({
      sourceBlockId,
      targetBlockId: existingChoiceOption.topologyBlockId,
    }).exec();

    if (existingTopologyConnection) {
      existingTopologyConnection.targetBlockId = new Types.ObjectId(
        targetBlockId
      );
      await existingTopologyConnection.save();
    }
  } else {
    await TopologyBlockConnection.create({
      sourceBlockId,
      targetBlockId,
      episodeId: existingTopologyBlock.episodeId,
    });
  }

  existingChoiceOption.topologyBlockId = new Types.ObjectId(targetBlockId);

  return await existingChoiceOption.save();
};

type CreateChoiceOptionTypes = {
  plotFieldCommandChoiceId: string;
  plotFieldCommandId: string;
  type: ChoiceOptionType | undefined;
};

export const createChoiceOptionService = async ({
  plotFieldCommandChoiceId,
  plotFieldCommandId,
  type,
}: CreateChoiceOptionTypes) => {
  validateMongoId({
    value: plotFieldCommandChoiceId,
    valueName: "PlotFieldCommandChoice",
  });
  validateMongoId({
    value: plotFieldCommandId,
    valueName: "PlotFieldCommand",
  });

  checkChoiceOptionType({ type });

  const existingChoice = await Choice.findById(plotFieldCommandChoiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  const newChoiceOption = await ChoiceOption.create({
    plotFieldCommandChoiceId,
    type: type ?? "common",
  });

  existingChoice.amountOfOptions += 1;
  await existingChoice.save();

  if (type === "characteristic") {
    await OptionCharacteristic.create({
      plotFieldCommandChoiceOptionId: newChoiceOption._id,
    });
  } else if (type === "premium") {
    await OptionPremium.create({
      plotFieldCommandChoiceOptionId: newChoiceOption._id,
    });
  } else if (type === "relationship") {
    await OptionRelationship.create({
      plotFieldCommandChoiceOptionId: newChoiceOption._id,
    });
  }

  await TranslationChoiceOption.create({
    language: "russian",
    commandId: plotFieldCommandId,
    translations: [],
    type: type ?? "common",
    choiceOptionId: newChoiceOption._id,
  });
  return newChoiceOption;
};

type UpdateChoiceOptionTypes = {
  choiceOptionId: string;
  option: string | undefined;
  priceAmethysts: number | undefined;
  amountOfPoints: number | undefined;
  characterId: string | undefined;
  characterCharacteristicId: string | undefined;
};

export const updateChoiceOptionService = async ({
  amountOfPoints,
  choiceOptionId,
  option,
  priceAmethysts,
  characterCharacteristicId,
  characterId,
}: UpdateChoiceOptionTypes) => {
  validateMongoId({
    value: choiceOptionId,
    valueName: "ChoiceOption",
  });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Choice Option with such id wasn't found");
  }

  if (option?.trim().length) {
    const existingTranslation = await Translation.findOne({
      choiceOptionId,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = option;
      await existingTranslation.save();
    }
  }

  if (existingChoiceOption.type === "common") {
    return await existingChoiceOption.save();
  } else if (existingChoiceOption.type === "characteristic") {
    const optionCharacteristic = await OptionCharacteristic.findOne({
      plotFieldCommandChoiceOptionId: choiceOptionId,
    }).exec();
    if (!optionCharacteristic) {
      throw createHttpError(400, "OptionCharacteristic wasn't found");
    }

    if (amountOfPoints) {
      optionCharacteristic.amountOfPoints = amountOfPoints;
    }
    if (characterCharacteristicId?.trim().length) {
      validateMongoId({
        value: characterCharacteristicId,
        valueName: "CharacterCharacteristic",
      });

      optionCharacteristic.characterCharacteristicId = new Types.ObjectId(
        characterCharacteristicId
      );
    }

    return await optionCharacteristic.save();
  } else if (existingChoiceOption.type === "premium") {
    const existingOptionPremium = await OptionPremium.findOne({
      plotFieldCommandChoiceOptionId: choiceOptionId,
    }).exec();

    if (!existingOptionPremium) {
      throw createHttpError(400, "ExistingOptionPremium wasn't found");
    }

    if (priceAmethysts) {
      existingOptionPremium.priceAmethysts = priceAmethysts;
    }
    return await existingOptionPremium.save();
  } else if (existingChoiceOption.type === "relationship") {
    const existingOptionRelationship = await OptionRelationship.findOne({
      plotFieldCommandChoiceOptionId: choiceOptionId,
    }).exec();

    if (!existingOptionRelationship) {
      throw createHttpError(400, "ExistingOptionRelationship wasn't found");
    }

    if (amountOfPoints) {
      existingOptionRelationship.amountOfPoints = amountOfPoints;
    }
    if (characterId?.trim().length) {
      validateMongoId({
        value: characterId,
        valueName: "Character",
      });
      existingOptionRelationship.characterId = new Types.ObjectId(characterId);
    }

    return await existingOptionRelationship.save();
  }
};

type ChoiceOptionUpdateOptionOrder = {
  optionOrder?: number;
  choiceOptionId: string;
  choiceId: string;
};

export const choiceOptionUpdateOptionOrderService = async ({
  optionOrder,
  choiceOptionId,
  choiceId,
}: ChoiceOptionUpdateOptionOrder) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });
  validateMongoId({ value: choiceOptionId, valueName: "choiceOption" });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Such choiceOption doesn't exist");
  }

  if (typeof optionOrder === "number") {
    const optionDuplicateOrder = await ChoiceOption.findOne({
      plotFieldCommandChoiceId: choiceId,
      optionOrder,
    }).exec();
    if (optionDuplicateOrder) {
      optionDuplicateOrder.optionOrder = null;
      await optionDuplicateOrder.save();
    }
    existingChoiceOption.optionOrder = optionOrder;
    const existingChoice = await Choice.findById(choiceId).exec();
    if (
      existingChoice &&
      existingChoice.timeLimitDefaultOptionId?.equals(existingChoiceOption._id)
    ) {
      existingChoice.timeLimitDefaultOptionId = existingChoiceOption._id;
      await existingChoice.save();
    }
  }

  return await existingChoiceOption.save();
};

type ChoiceOptionUpdateSexualOrientations = {
  sexualOrientationType: string | undefined;
  choiceOptionId: string;
};

export const choiceOptionUpdateSexualOrientationsService = async ({
  sexualOrientationType,
  choiceOptionId,
}: ChoiceOptionUpdateSexualOrientations) => {
  validateMongoId({ value: choiceOptionId, valueName: "choiceOption" });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Such choiceOption doesn't exist");
  }

  if (
    sexualOrientationType &&
    SexualOrientationTypes.includes(sexualOrientationType.toLowerCase())
  ) {
    existingChoiceOption.sexualOrientationType =
      sexualOrientationType.toLowerCase();
  }

  return await existingChoiceOption.save();
};

type DeleteChoiceOptionTypes = {
  choiceOptionId: string;
};

export const deleteChoiceOptionService = async ({
  choiceOptionId,
}: DeleteChoiceOptionTypes) => {
  validateMongoId({ value: choiceOptionId, valueName: "ChoiceOption" });

  const currentChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();

  const topologyBlock = await TopologyBlock.findById(
    currentChoiceOption?.topologyBlockId
  ).exec();
  if (topologyBlock) {
    await TopologyBlockInfo.findOneAndDelete({
      topologyBlockId: topologyBlock._id,
    });
    await topologyBlock.deleteOne();
  }

  return await currentChoiceOption?.deleteOne();
};
