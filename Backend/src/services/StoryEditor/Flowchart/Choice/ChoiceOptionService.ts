import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import { ChoiceOptionType } from "../../../../controllers/StoryEditor/Flowchart/Choice/ChoiceOptionController";
import ChoiceOption from "../../../../models/StoryEditor/Flowchart/Choice/ChoiceOption";
import Choice from "../../../../models/StoryEditor/Flowchart/Choice/Choice";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import OptionCharacteristic from "../../../../models/StoryEditor/Flowchart/Choice/OptionCharacteristic";
import OptionPremium from "../../../../models/StoryEditor/Flowchart/Choice/OptionPremium";
import OptionRelationship from "../../../../models/StoryEditor/Flowchart/Choice/OptionRelationship";
import OptionRequirement from "../../../../models/StoryEditor/Flowchart/Choice/OptionRequirement";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";

type CreateChoiceOptionTypes = {
  flowchartCommandChoiceId: string;
  topologyBlockId: string;
  type: ChoiceOptionType | undefined;
};

export const createChoiceOptionService = async ({
  flowchartCommandChoiceId,
  topologyBlockId,
  type,
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

  const topologyBlocks = await TopologyBlock.find({ topologyBlockId }).lean();
  const topologyBlockNumber = topologyBlocks.length ?? 1;

  const newTopologyBlock = await TopologyBlock.create({
    coordinatesX: (existingTopologyBlock.coordinatesX ?? 0) + 50,
    coordinatesY: (existingTopologyBlock.coordinatesY ?? 0) + 50,
    episodeId: existingTopologyBlock.episodeId,
    topologyBlockId: topologyBlockId,
    name: (existingTopologyBlock.name ?? "New") + " " + topologyBlockNumber,
  });

  await TopologyBlockInfo.create({
    topologyBlockId: newTopologyBlock._id,
    amountOfAchievements: 0,
    amountOfAmethysts: 0,
    amountOfAuthorWords: 0,
    amountOfCharacterWords: 0,
    amountOfWords: 0,
  });

  return await ChoiceOption.create({
    flowchartCommandChoiceId,
    topologyBlockId,
    type: type ?? "common",
  });
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
    await OptionCharacteristic.create({
      amountOfPoints,
      flowchartCommandChoiceOptionId: existingChoiceOption._id,
      characteristicName,
    });
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

  return `ChoiceOption with id ${choiceOptionId} was removed`;
};
