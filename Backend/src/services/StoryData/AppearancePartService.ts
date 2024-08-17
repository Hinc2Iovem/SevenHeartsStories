import createHttpError from "http-errors";
import AppearancePart from "../../models/StoryData/AppearancePart";
import { validateMongoId } from "../../utils/validateMongoId";
import Translation from "../../models/StoryData/Translation/Translation";
import {
  AppearanceParts,
  AppearancePartsTypes,
} from "../../consts/APPEARANCE_PARTS";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";

export const appearancePartGetAllService = async () => {
  const appearanceParts = await AppearancePart.find().lean();
  if (!appearanceParts.length) {
    return [];
  }

  return appearanceParts;
};

type AppearancePartGetByAppearancePartIdTypes = {
  appearancePartId: string;
};

export const appearancePartGetByAppearancePartIdService = async ({
  appearancePartId,
}: AppearancePartGetByAppearancePartIdTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "AppearancePart" });
  const appearanceParts = await AppearancePart.findById(
    appearancePartId
  ).lean();
  if (!appearanceParts) {
    return null;
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
  const appearanceParts = await AppearancePart.find({
    characterId,
  }).lean();

  if (!appearanceParts.length) {
    return [];
  }

  return appearanceParts;
};

type AppearancePartGetByCharacterIdAndTypeTypes = {
  characterId: string;
  type: AppearancePartsTypes;
};

export const appearancePartGetByCharacterIdAndTypeService = async ({
  characterId,
  type,
}: AppearancePartGetByCharacterIdAndTypeTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });
  if (!AppearanceParts.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      "Appearance part can be only of type body, hair, dress, accessory, emotion, art, skin"
    );
  }
  const appearanceParts = await AppearancePart.find({
    characterId,
    type: type.toLowerCase(),
  }).lean();
  if (!appearanceParts.length) {
    return [];
  }

  return appearanceParts;
};

type AppearancePartCreateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
  img: string | undefined;
  characterId: string;
};

export const appearancePartCreateService = async ({
  appearancePartName,
  appearancePartType,
  img,
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
    img: img ?? "",
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

type AppearancePartUpdateImgTypes = {
  appearancePartId: string;
  imgUrl: string | undefined;
};

export const appearancePartUpdateImgService = async ({
  imgUrl,
  appearancePartId,
}: AppearancePartUpdateImgTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  if (!imgUrl?.trim().length) {
    throw createHttpError(400, "ImgUrl is required");
  }

  existingAppearancePart.img = imgUrl;

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
