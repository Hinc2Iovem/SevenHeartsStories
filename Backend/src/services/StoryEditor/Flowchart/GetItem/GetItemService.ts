import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import GetItem from "../../../../models/StoryEditor/Flowchart/GetItem/GetItem";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CreateGetItemTypes = {
  flowchartCommandId: string;
};

export const createGetItemService = async ({
  flowchartCommandId,
}: CreateGetItemTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await GetItem.create({
    flowchartCommandId,
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
    existingGetItem.buttonText = buttonText;

    if (
      existingGetItem &&
      existingGetItem.children &&
      existingGetItem.children.length > 0
    ) {
      const buttonTranslationId = existingGetItem.children[0];
      const existingTranslation = await Translation.findById(
        buttonTranslationId
      ).exec();
      if (existingTranslation) {
        existingTranslation.text = buttonText;
        await existingTranslation.save();
      }
    } else {
      const newTranslation = await Translation.create({
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ButtonText,
        text: buttonText,
      });
      existingGetItem.children[0] = newTranslation._id;
    }
  }
  if (itemDescription?.trim().length) {
    existingGetItem.itemDescription = itemDescription;

    if (
      existingGetItem &&
      existingGetItem.children &&
      existingGetItem.children.length > 0
    ) {
      const descriptionTranslationId = existingGetItem.children[1];
      const existingTranslation = await Translation.findById(
        descriptionTranslationId
      ).exec();
      if (existingTranslation) {
        existingTranslation.text = itemDescription;
        await existingTranslation.save();
      }
    } else {
      const newTranslation = await Translation.create({
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ItemDescription,
        text: itemDescription,
      });
      existingGetItem.children[1] = newTranslation._id;
    }
  }
  if (itemName?.trim().length) {
    existingGetItem.itemName = itemName;

    if (
      existingGetItem &&
      existingGetItem.children &&
      existingGetItem.children.length > 0
    ) {
      const nameTranslationId = existingGetItem.children[2];
      const existingTranslation = await Translation.findById(
        nameTranslationId
      ).exec();
      if (existingTranslation) {
        existingTranslation.text = itemName;
        await existingTranslation.save();
      }
    } else {
      const newTranslation = await Translation.create({
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ItemName,
        text: itemName,
      });
      existingGetItem.children[2] = newTranslation._id;
    }
  }

  return await existingGetItem.save();
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
