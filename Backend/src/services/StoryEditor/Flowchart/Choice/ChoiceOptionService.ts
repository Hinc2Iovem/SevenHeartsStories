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

type CreateChoiceOptionTypes = {
  flowchartCommandChoiceId: string;
  topologyBlockId: string;
  option: string | undefined;
  type: ChoiceOptionType | undefined;
  priceAmethysts: number | undefined;
  characterName: string | undefined;
  amountOfPoints: number | undefined;
  requiredKey: string | undefined;
  requiredCharacteristic: string | undefined;
  characteristicName: string | undefined;
};

export const createChoiceOptionService = async ({
  amountOfPoints,
  characterName,
  characteristicName,
  flowchartCommandChoiceId,
  option,
  priceAmethysts,
  requiredCharacteristic,
  requiredKey,
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

  if (!option?.trim().length) {
    throw createHttpError(400, "option is required");
  }

  if (type === "common") {
    const choiceOption = await ChoiceOption.create({
      flowchartCommandChoiceId,
      option,
      topologyBlockId,
      type,
    });
    return choiceOption;
  } else if (type === "characteristic") {
    if (!amountOfPoints || !characteristicName?.trim().length) {
      throw createHttpError(
        400,
        "Amount of Points and Characterstic Name are required"
      );
    }
    const choiceOption = await ChoiceOption.create({
      flowchartCommandChoiceId,
      option,
      topologyBlockId,
      type,
    });
    await OptionCharacteristic.create({
      amountOfPoints,
      flowchartCommandChoiceOptionId: choiceOption._id,
      characteristicName,
    });
    return choiceOption;
  } else if (type === "premium") {
    if (!priceAmethysts) {
      throw createHttpError(400, "You need to Enter Amount Of Amethysts");
    }
    const choiceOption = await ChoiceOption.create({
      flowchartCommandChoiceId,
      option,
      topologyBlockId,
      type,
    });
    await OptionPremium.create({
      flowchartCommandChoiceOptionId: choiceOption._id,
      priceAmethysts,
    });
    return choiceOption;
  } else if (type === "relationship") {
    if (!amountOfPoints || !characterName?.trim().length) {
      throw createHttpError(
        400,
        "You need to Enter Amount Of Points and Character Name"
      );
    }
    const choiceOption = await ChoiceOption.create({
      flowchartCommandChoiceId,
      option,
      topologyBlockId,
      type,
    });
    await OptionRelationship.create({
      flowchartCommandChoiceOptionId: choiceOption._id,
      amountOfPoints,
      characterName,
    });
    return choiceOption;
  } else if (type === "requirement") {
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
    const choiceOption = await ChoiceOption.create({
      flowchartCommandChoiceId,
      option,
      topologyBlockId,
      type,
    });
    await OptionRequirement.create({
      flowchartCommandChoiceOptionId: choiceOption._id,
      amountOfPoints,
      requiredCharacteristic,
      requiredKey,
    });
    return choiceOption;
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
