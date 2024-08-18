import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TranslationCommandWardrobe from "../../../../models/StoryData/Translation/TranslationCommandWardrobe";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";
import CommandWardrobe from "../../../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobe";

type CommandWardrobeByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
  currentLanguage: string;
};

export const commandWardrobeTranslationByCommandIdService = async ({
  plotFieldCommandId,
  currentLanguage,
}: CommandWardrobeByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationCommandWardrobe.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type CommandWardrobeByTopologyBlockIdTypes = {
  topologyBlockId: string;
  currentLanguage: string;
};

export const getAllCommandWardrobesTranslationByTopologyBlockIdService =
  async ({
    topologyBlockId,
    currentLanguage,
  }: CommandWardrobeByTopologyBlockIdTypes) => {
    validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, `CurrentLanguage is required`);
    }

    checkCurrentLanguage({ currentLanguage });

    const existingCommandWardrobes = await TranslationCommandWardrobe.find({
      topologyBlockId,
      language: currentLanguage,
    }).lean();

    if (!existingCommandWardrobes.length) {
      return [];
    }

    return existingCommandWardrobes;
  };

type CreateCommandWardrobeTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export const createCommandWardrobeTranslationService = async ({
  plotFieldCommandId,
  topologyBlockId,
}: CreateCommandWardrobeTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  await TranslationCommandWardrobe.create({
    commandId: plotFieldCommandId,
    topologyBlockId,
    language: "russian",
    translations: [],
  });
  return await CommandWardrobe.create({ plotFieldCommandId });
};

type UpdateCommandWardrobeTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

export const commandWardrobeUpdateTranslationService = async ({
  plotFieldCommandId,
  text,
  textFieldName,
  currentLanguage,
  topologyBlockId,
}: UpdateCommandWardrobeTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "CommandWardrobe" });

  const existingPlotFieldCommand = await TranslationCommandWardrobe.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).exec();

  if (existingPlotFieldCommand) {
    const currentTextFieldName = existingPlotFieldCommand.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingPlotFieldCommand.translations.push({
        text,
        textFieldName,
      });
    }

    return await existingPlotFieldCommand.save();
  } else {
    validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
    return await TranslationCommandWardrobe.create({
      commandId: plotFieldCommandId,
      language: currentLanguage,
      topologyBlockId,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
