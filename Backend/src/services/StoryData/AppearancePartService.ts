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

  const newAppearancePart = await AppearancePart.create({
    type: appearancePartType,
  });

  await Translation.create({
    appearancePartId: newAppearancePart._id,
    language: currentLanguage,
    textFieldName: appearancePartType.toLowerCase(),
    text: appearancePartName,
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

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  const existingTranslation = await Translation.findOne({
    appearancePartId: existingAppearancePart._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation) {
    return await Translation.create({
      appearancePartId: existingAppearancePart.id,
      language: currentLanguage,
      text: appearancePartName ?? "",
      textFieldName: appearancePartType ?? "",
    });
  } else {
    if (appearancePartName?.trim().length) {
      existingTranslation.text = appearancePartName;
    }
    if (appearancePartType?.trim().length) {
      existingTranslation.textFieldName = appearancePartType.toLowerCase();
    }

    await existingTranslation.save();
  }

  return existingTranslation;
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
