import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { ChoiceOptionType } from "../../../../controllers/StoryEditor/Flowchart/Choice/ChoiceOptionController";
import Translation from "../../../../models/StoryData/Translation";
import Choice from "../../../../models/StoryEditor/Flowchart/Choice/Choice";
import ChoiceOption from "../../../../models/StoryEditor/Flowchart/Choice/ChoiceOption";
import OptionCharacteristic from "../../../../models/StoryEditor/Flowchart/Choice/OptionCharacteristic";
import OptionPremium from "../../../../models/StoryEditor/Flowchart/Choice/OptionPremium";
import OptionRelationship from "../../../../models/StoryEditor/Flowchart/Choice/OptionRelationship";
import OptionRequirement from "../../../../models/StoryEditor/Flowchart/Choice/OptionRequirement";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockConnection from "../../../../models/StoryEditor/Topology/TopologyBlockConnection";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { createTopologyBlockConnection } from "../../../../utils/createTopologyBlockConnection";
import { Types } from "mongoose";
import { createTopologyBlock } from "../../../../utils/createTopologyBlock";

type CreateChoiceOptionTypes = {
  flowchartCommandChoiceId: string;
  topologyBlockId: string;
  episodeId: string;
  type: ChoiceOptionType | undefined;
};

export const createChoiceOptionService = async ({
  flowchartCommandChoiceId,
  topologyBlockId,
  type,
  episodeId,
}: CreateChoiceOptionTypes) => {
  validateMongoId({
    value: flowchartCommandChoiceId,
    valueName: "FlowchartCommandChoice",
  });
  validateMongoId({
    value: topologyBlockId,
    valueName: "TopologyBlock",
  });

  const existingChoice = await Choice.findById(flowchartCommandChoiceId).lean();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  const existingTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).lean();
  if (!existingTopologyBlock) {
    throw createHttpError(400, "TopologyBlock with such id wasn't found");
  }

  const newChoiceOption = await ChoiceOption.create({
    flowchartCommandChoiceId,
    topologyBlockId,
    type: type ?? "common",
  });

  const topologyBlocks = await TopologyBlockConnection.find({
    sourceBlockId: topologyBlockId,
  }).lean();
  const topologyBlockNumber = topologyBlocks.length ?? 1;

  const newTopologyBlock = await createTopologyBlock({
    coordinatesX: (existingTopologyBlock.coordinatesX ?? 0) + 50,
    coordinatesY: (existingTopologyBlock.coordinatesY ?? 0) + 50,
    name: (existingTopologyBlock.name ?? "New") + " " + topologyBlockNumber,
    choiceOptionId: newChoiceOption._id,
    episodeId: new Types.ObjectId(episodeId),
    sourceBlockId: new Types.ObjectId(topologyBlockId),
    isStartingTopologyBlock: false,
  });

  const existingTopologyConnection = await TopologyBlockConnection.findOne({
    sourceBlockId: topologyBlockId,
    targetBlockId: newTopologyBlock._id,
  }).exec();

  if (!existingTopologyConnection) {
    await createTopologyBlockConnection({
      sourceBlockId: new Types.ObjectId(topologyBlockId),
      targetBlockId: newTopologyBlock._id,
    });
  }

  return newChoiceOption;
};

type UpdateChoiceOptionTypes = {
  choiceOptionId: string;
  option: string | undefined;
  priceAmethysts: number | undefined;
  characterName: string | undefined;
  amountOfPoints: number | undefined;
  requiredKey: string | undefined;
  requiredCharacteristic: string | undefined;
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

export const updateChoiceOptionService = async ({
  amountOfPoints,
  characterName,
  characteristicName,
  choiceOptionId,
  option,
  priceAmethysts,
  requiredCharacteristic,
  requiredKey,
  currentLanguage,
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

  if (!option?.trim().length) {
    throw createHttpError(400, "option is required");
  }

  const existingTranslation = await Translation.findById(
    existingChoiceOption.translationId
  ).exec();

  if (existingTranslation) {
    existingTranslation.text = option;
    await existingTranslation.save();
  } else {
    const newTranslation = await Translation.create({
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.ChoiceOption,
      text: option,
    });
    existingChoiceOption.translationId = newTranslation._id;
  }

  if (existingChoiceOption.type === "common") {
    existingChoiceOption.option = option;
    return await existingChoiceOption.save();
  } else if (existingChoiceOption.type === "characteristic") {
    if (!amountOfPoints || !characteristicName?.trim().length) {
      throw createHttpError(
        400,
        "Amount of Points and Characterstic Name are required"
      );
    }
    existingChoiceOption.option = option;
    const newOptionCharacteristic = await OptionCharacteristic.create({
      amountOfPoints,
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      characteristicName,
    });
    const existingTranslation = await Translation.findById(
      newOptionCharacteristic.translationId
    ).exec();

    if (existingTranslation) {
      existingTranslation.text = characteristicName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        choiceOptionId,
        language: existingChoiceOption.currentLanguage,
        textFieldName: TranslationTextFieldName.ChoiceOptionCharacteristic,
        text: characteristicName,
      });
    }
    return await existingChoiceOption.save();
  } else if (existingChoiceOption.type === "premium") {
    if (!priceAmethysts) {
      throw createHttpError(400, "You need to Enter Amount Of Amethysts");
    }

    await OptionPremium.create({
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      priceAmethysts,
    });
    existingChoiceOption.option = option;
    return await existingChoiceOption.save();
  } else if (existingChoiceOption.type === "relationship") {
    if (!amountOfPoints || !characterName?.trim().length) {
      throw createHttpError(
        400,
        "You need to Enter Amount Of Points and Character Name"
      );
    }
    await OptionRelationship.create({
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      amountOfPoints,
      characterName,
    });
    existingChoiceOption.option = option;
    return await existingChoiceOption.save();
  } else if (existingChoiceOption.type === "requirement") {
    if (
      !amountOfPoints ||
      !requiredCharacteristic?.trim().length ||
      !requiredKey
    ) {
      throw createHttpError(
        400,
        "You need to Enter Amount Of Points and Characteristic or requiredKey"
      );
    }
    await OptionRequirement.create({
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      amountOfPoints,
      requiredCharacteristic,
      requiredKey,
    });
    existingChoiceOption.option = option;
    return await existingChoiceOption.save();
  }
};

type DeleteChoiceOptionTypes = {
  choiceOptionId: string;
};

export const deleteChoiceOptionService = async ({
  choiceOptionId,
}: DeleteChoiceOptionTypes) => {
  validateMongoId({ value: choiceOptionId, valueName: "ChoiceOption" });

  await ChoiceOption.findByIdAndDelete(choiceOptionId);

  const topologyBlock = await TopologyBlock.findOne({ choiceOptionId }).exec();
  if (topologyBlock) {
    await TopologyBlockInfo.findOneAndDelete({
      topologyBlockId: topologyBlock._id,
    });
    await topologyBlock.deleteOne();
  }

  return `ChoiceOption with id ${choiceOptionId} was removed`;
};
