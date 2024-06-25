import createHttpError from "http-errors";
import AppearancePart from "../../models/StoryData/AppearancePart";
import { validateMongoId } from "../../utils/validateMongoId";
import Translation from "../../models/StoryData/Translation";

type AppearancePartCreateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
};

export const appearancePartCreateService = async ({
  appearancePartName,
  appearancePartType,
  currentLanguage,
}: AppearancePartCreateTypes) => {
  if (
    !appearancePartName?.trim().length ||
    !appearancePartType?.trim().length ||
    !currentLanguage?.trim().length
  ) {
    throw createHttpError(
      400,
      "AppearanceName, currentLanguage and AppearanceType are required"
    );
  }

  const newTranslation = await Translation.create({
    language: currentLanguage,
    textFieldName: appearancePartType.toLowerCase(),
    text: appearancePartName,
  });

  const newAppearancePart = await AppearancePart.create({
    name: appearancePartName,
    type: appearancePartType,
    translationId: newTranslation._id,
  });

  return newAppearancePart;
};

type AppearancePartUpdateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
  appearancePartId: string;
};

export const appearancePartUpdateNameTypeService = async ({
  appearancePartName,
  appearancePartType,
  appearancePartId,
  currentLanguage,
}: AppearancePartUpdateTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  if (appearancePartName?.trim().length) {
    existingAppearancePart.name = appearancePartName;
  }
  if (appearancePartType?.trim().length) {
    existingAppearancePart.type = appearancePartType;
  }

  const existingTranslation = await Translation.findById(
    existingAppearancePart.translationId
  ).exec();

  if (existingTranslation) {
    if (appearancePartName?.trim().length) {
      existingTranslation.text = appearancePartName;
    }
    if (appearancePartType?.trim().length) {
      existingTranslation.textFieldName = appearancePartType.toLowerCase();
    } else if (currentLanguage?.trim().length) {
      existingTranslation.language = currentLanguage;
    }
    await existingTranslation.save();
  } else {
    await Translation.create({
      language: currentLanguage,
      text: appearancePartName ?? "",
      textFieldName: appearancePartType ?? "",
    });
  }

  return await existingAppearancePart.save();
};

type AppearancePartDeleteTypes = {
  appearancePartId: string;
};

export const appearancePartDeleteService = async ({
  appearancePartId,
}: AppearancePartDeleteTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  return await existingAppearancePart.deleteOne();
};
