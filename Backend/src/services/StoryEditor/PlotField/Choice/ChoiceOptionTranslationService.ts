import createHttpError from "http-errors";
import TranslationChoiceOption from "../../../../models/StoryData/Translation/TranslationChoiceOption";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../../utils/validateMongoId";

type ChoiceOptionByChoiceOptionIdTypes = {
  choiceOptionId: string;
  currentLanguage: string;
};

export const getChoiceOptionTranslationByCommandIdService = async ({
  choiceOptionId,
  currentLanguage,
}: ChoiceOptionByChoiceOptionIdTypes) => {
  validateMongoId({ value: choiceOptionId, valueName: "ChoiceOption" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationChoiceOption.findOne({
    language: currentLanguage,
    choiceOptionId,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type ChoiceOptionByChoiceIdTypes = {
  choiceId: string;
  currentLanguage: string;
};

export const getAllChoiceOptionsTranslationByChoiceIdService = async ({
  choiceId,
  currentLanguage,
}: ChoiceOptionByChoiceIdTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationChoiceOption.find({
    commandId: choiceId,
    language: currentLanguage,
  }).lean();

  if (!existingItem.length) {
    return [];
  }

  return existingItem;
};

type UpdateChoiceOptionTypes = {
  choiceId: string;
  choiceOptionId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
  type?: string;
};

export const choiceOptionUpdateTranslationService = async ({
  text,
  textFieldName,
  currentLanguage,
  choiceId,
  choiceOptionId,
  type,
}: UpdateChoiceOptionTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });
  validateMongoId({ value: choiceOptionId, valueName: "ChoiceOption" });

  const existingChoice = await TranslationChoiceOption.findOne({
    language: currentLanguage,
    choiceOptionId,
  }).exec();

  if (existingChoice) {
    const currentTextFieldName = existingChoice.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingChoice.translations.push({
        text,
        textFieldName,
      });
    }

    return await existingChoice.save();
  } else {
    validateMongoId({ value: choiceOptionId, valueName: "ChoiceOption" });
    return await TranslationChoiceOption.create({
      language: currentLanguage,
      type: type || "common",
      commandId: choiceId,
      choiceOptionId,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
