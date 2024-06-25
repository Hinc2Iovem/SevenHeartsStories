import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Translation from "../../models/StoryData/Translation";

type TranslationStoryDataTypes = {
  currentLanguage: string | undefined;
  textFieldName: string | undefined;
  text: string | undefined;
};

export const addTranslationService = async ({
  currentLanguage,
  textFieldName,
  text,
}: TranslationStoryDataTypes) => {
  if (
    !currentLanguage?.trim().length ||
    !textFieldName?.trim().length ||
    !text?.trim().length
  ) {
    throw createHttpError(
      400,
      "Current Language, text and textFieldName are required"
    );
  }

  const existingTranslation = await Translation.findOne({
    textFieldName,
    language: currentLanguage,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = text;
    return await existingTranslation.save();
  }
  return await Translation.create({
    textFieldName,
    text,
    language: currentLanguage,
  });
};

type TranslationUpdateTranslationTypes = {
  currentLanguage: string | undefined;
  translationId: string;
};

export const updateCurrentLanguageTranslationService = async ({
  currentLanguage,
  translationId,
}: TranslationUpdateTranslationTypes) => {
  validateMongoId({ value: translationId, valueName: "Translation" });

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Current Language is required");
  }

  const existingTranslation = await Translation.findById(translationId).exec();

  if (!existingTranslation) {
    throw createHttpError(400, "Such translation doesn't exist");
  }

  existingTranslation.language = currentLanguage;
  return await existingTranslation.save();
};
