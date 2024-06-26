import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import GetItem from "../../../../models/StoryEditor/PlotField/GetItem/GetItem";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CreateGetItemTypes = {
  plotFieldCommandId: string;
};

export const createGetItemService = async ({
  plotFieldCommandId,
}: CreateGetItemTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await GetItem.create({
    plotFieldCommandId,
  });
};

type UpdateGetItemTypes = {
  getItemId: string;
  buttonText: string | undefined;
  itemDescription: string | undefined;
  itemName: string | undefined;
  currentLanguage: string | undefined;
};

export const updateGetItemService = async ({
  getItemId,
  buttonText,
  itemDescription,
  itemName,
  currentLanguage,
}: UpdateGetItemTypes) => {
  validateMongoId({ value: getItemId, valueName: "GetItem" });

  const existingGetItem = await GetItem.findById(getItemId).exec();

  if (!existingGetItem) {
    throw createHttpError(400, "GetItem with such id wasn't found");
  }

  if (buttonText?.trim().length) {
    const existingTranslation = await Translation.findOne({
      commandId: getItemId,
      textFieldName: TranslationTextFieldName.ButtonText,
      language: currentLanguage,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = buttonText;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: getItemId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ButtonText,
        text: buttonText,
      });
    }
  }
  if (itemDescription?.trim().length) {
    const existingTranslation = await Translation.findOne({
      commandId: getItemId,
      textFieldName: TranslationTextFieldName.ItemDescription,
      language: currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = itemDescription;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: getItemId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ItemDescription,
        text: itemDescription,
      });
    }
  }
  if (itemName?.trim().length) {
    const existingTranslation = await Translation.findOne({
      commandId: getItemId,
      textFieldName: TranslationTextFieldName.ItemName,
      language: currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = itemName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: getItemId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ItemName,
        text: itemName,
      });
    }
  }

  return existingGetItem;
};

type DeleteGetItemTypes = {
  getItemId: string;
};

export const deleteGetItemService = async ({
  getItemId,
}: DeleteGetItemTypes) => {
  validateMongoId({ value: getItemId, valueName: "GetItem" });

  await GetItem.findByIdAndDelete(getItemId);

  return `GetItem with id ${getItemId} was removed`;
};
