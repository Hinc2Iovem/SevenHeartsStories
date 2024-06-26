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
  episodeId: string;
  topologyBlockId: string;
  type: ChoiceOptionType | undefined;
};

export const createChoiceOptionService = async ({
  flowchartCommandChoiceId,
  type,
  episodeId,
  topologyBlockId,
}: CreateChoiceOptionTypes) => {
  validateMongoId({
    value: flowchartCommandChoiceId,
    valueName: "FlowchartCommandChoice",
  });

  const existingChoice = await Choice.findById(flowchartCommandChoiceId).lean();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }

  const existingCurrentTopologyBlock = await TopologyBlock.findById(
    topologyBlockId
  ).exec();

  if (!existingCurrentTopologyBlock) {
    throw createHttpError(
      400,
      "Something went wrong, current topology block doesn't exist"
    );
  }

  const topologyBlocks = await TopologyBlockConnection.find({
    sourceBlockId: topologyBlockId,
  }).lean();
  const topologyBlockNumber = topologyBlocks.length ?? 1;

  const newTopologyBlock = await createTopologyBlock({
    coordinatesX: (existingCurrentTopologyBlock.coordinatesX ?? 0) + 50,
    coordinatesY: (existingCurrentTopologyBlock.coordinatesY ?? 0) + 50,
    name: existingCurrentTopologyBlock.name + " " + topologyBlockNumber,
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

  const newChoiceOption = await ChoiceOption.create({
    flowchartCommandChoiceId,
    topologyBlockId: newTopologyBlock._id,
    type: type ?? "common",
  });

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

  const existingTranslation = await Translation.findOne({
    choiceOptionId,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.ChoiceOption,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = option;
    await existingTranslation.save();
  } else {
    await Translation.create({
      choiceOptionId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.ChoiceOption,
      text: option,
    });
  }

  if (existingChoiceOption.type === "common") {
    return existingChoiceOption;
  } else if (existingChoiceOption.type === "characteristic") {
    if (!amountOfPoints || !characteristicName?.trim().length) {
      throw createHttpError(
        400,
        "Amount of Points and Characterstic Name are required"
      );
    }
    const newOptionCharacteristic = await OptionCharacteristic.create({
      amountOfPoints,
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      characteristicName,
    });
    const existingTranslationCharacteristic = await Translation.findOne({
      choiceOptionCharacteristicId: newOptionCharacteristic._id,
      textFieldName: TranslationTextFieldName.ChoiceOptionCharacteristic,
      language: currentLanguage,
    }).exec();

    if (existingTranslationCharacteristic) {
      existingTranslationCharacteristic.text = characteristicName;
      await existingTranslationCharacteristic.save();
    } else {
      await Translation.create({
        choiceOptionCharacteristicId: newOptionCharacteristic._id,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ChoiceOptionCharacteristic,
        text: characteristicName,
      });
    }
    return existingChoiceOption;
  } else if (existingChoiceOption.type === "premium") {
    if (!priceAmethysts) {
      throw createHttpError(400, "You need to Enter Amount Of Amethysts");
    }

    await OptionPremium.create({
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      priceAmethysts,
    });
    return existingChoiceOption;
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
    return existingChoiceOption;
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
    return existingChoiceOption;
  }
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
