import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TranslationGetItem from "../../../../models/StoryData/Translation/TranslationGetItem";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";

type GetItemByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
  currentLanguage: string;
};

export const getItemTranslationByCommandIdService = async ({
  plotFieldCommandId,
  currentLanguage,
}: GetItemByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationGetItem.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type GetItemByTopologyBlockIdTypes = {
  topologyBlockId: string;
  currentLanguage: string;
};

export const getAllItemTranslationByTopologyBlockIdService = async ({
  topologyBlockId,
  currentLanguage,
}: GetItemByTopologyBlockIdTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationGetItem.find({
    topologyBlockId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type CreateGetItemTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export const createGetItemTranslationService = async ({
  plotFieldCommandId,
  topologyBlockId,
}: CreateGetItemTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await TranslationGetItem.create({
    commandId: plotFieldCommandId,
    language: "russian",
    topologyBlockId,
  });
};

type UpdateGetItemTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

export const getItemUpdateTranslationService = async ({
  plotFieldCommandId,
  text,
  textFieldName,
  currentLanguage,
  topologyBlockId,
}: UpdateGetItemTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "GetItem" });

  const existingPlotFieldCommand = await TranslationGetItem.findOne({
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
    return await TranslationGetItem.create({
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
