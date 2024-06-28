import createHttpError from "http-errors";
import AppearancePart from "../../models/StoryData/AppearancePart";
import { validateMongoId } from "../../utils/validateMongoId";
import Translation from "../../models/StoryData/Translation";
import { AppearanceParts } from "../../consts/APPEARANCE_PARTS";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";

export const appearancePartGetAllService = async () => {
  const appearanceParts = await AppearancePart.find().lean();
  if (!appearanceParts.length) {
    return [];
  }

  return appearanceParts;
};
type AppearancePartGetByCharacterIdTypes = {
  characterId: string;
};

export const appearancePartGetByCharacterIdService = async ({
  characterId,
}: AppearancePartGetByCharacterIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const appearanceParts = await AppearancePart.find({ characterId }).lean();
  if (!appearanceParts.length) {
    return [];
  }

  return appearanceParts;
};

type AppearancePartCreateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
  characterId: string;
};

export const appearancePartCreateService = async ({
  appearancePartName,
  appearancePartType,
  currentLanguage,
  characterId,
}: AppearancePartCreateTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });
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

  if (!AppearanceParts.includes(appearancePartType.toLowerCase())) {
    throw createHttpError(
      400,
      "Appearance part can be only of type body, hair, dress, accessory, emotion, art, skin"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const newAppearancePart = await AppearancePart.create({
    type: appearancePartType.toLowerCase(),
    characterId,
  });

  await Translation.create({
    appearancePartId: newAppearancePart._id,
    language: currentLanguage.toLowerCase(),
    textFieldName: appearancePartType.toLowerCase(),
    text: appearancePartName,
  });

  return {
    type: appearancePartType.toLowerCase(),
    name: appearancePartName,
  };
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
