import createHttpError from "http-errors";
import { validateMongoId } from "../../../utils/validateMongoId";
import TranslationAppearancePart from "../../../models/StoryData/Translation/TranslationAppearancePart";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import AppearancePart from "../../../models/StoryData/AppearancePart";
import {
  AppearanceParts,
  AppearancePartsTypes,
} from "../../../consts/APPEARANCE_PARTS";
import { appearancePartTranslationUpdateNameTypeService } from "../../Additional/TranslationService";

type AppearancePartByAppearancePartIdTypes = {
  appearancePartId: string;
  currentLanguage: string;
};

export const appearancePartTranslationByAppearancePartIdService = async ({
  appearancePartId,
  currentLanguage,
}: AppearancePartByAppearancePartIdTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "AppearancePart" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationAppearancePart.findOne({
    language: currentLanguage,
    appearancePartId,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type AppearancePartByCharacterIdAndTypeTypes = {
  characterId: string;
  currentLanguage: string;
  type: AppearancePartsTypes;
};

export const getAllAppearancePartsTranslationByCharacterIdAndTypeService =
  async ({
    characterId,
    currentLanguage,
    type,
  }: AppearancePartByCharacterIdAndTypeTypes) => {
    validateMongoId({ value: characterId, valueName: "Character" });
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, `CurrentLanguage is required`);
    }

    checkCurrentLanguage({ currentLanguage });

    const query: { characterId: string; language: string; type?: string } = {
      characterId,
      language: currentLanguage,
    };

    if (type?.trim().length) {
      query.type = type.toLowerCase();
    }

    const existingAppearanceParts = await TranslationAppearancePart.find(
      query
    ).lean();

    if (!existingAppearanceParts.length) {
      return [];
    }

    return existingAppearanceParts;
  };

type AppearancePartByCharacterIdTypes = {
  characterId: string;
  currentLanguage: string;
};

export const getAllAppearancePartsTranslationByCharacterIdService = async ({
  characterId,
  currentLanguage,
}: AppearancePartByCharacterIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingAppearanceParts = await TranslationAppearancePart.find({
    characterId,
    language: currentLanguage,
  }).lean();

  if (!existingAppearanceParts.length) {
    return [];
  }

  return existingAppearanceParts;
};

type CreateAppearancePartTypes = {
  characterId: string;
  type?: AppearancePartsTypes;
  appearancePartName?: string;
};

export const createAppearancePartTranslationService = async ({
  characterId,
  type,
  appearancePartName,
}: CreateAppearancePartTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });
  if (!appearancePartName?.trim().length) {
    throw createHttpError(400, "AppearancePartName is required");
  }

  if (!AppearanceParts.includes(type?.toLowerCase() || "")) {
    throw createHttpError(
      400,
      `Appearance part can be only of type ${AppearanceParts.map((ap) => ap)}`
    );
  }

  const newAppearancePart = await AppearancePart.create({ characterId, type });

  const translations = [
    {
      text: appearancePartName,
      textFieldName: type,
    },
  ];

  return await TranslationAppearancePart.create({
    language: "russian",
    characterId,
    appearancePartId: newAppearancePart._id,
    type,
    translations: translations,
  });
};

type UpdateAppearancePartTypes = {
  appearancePartId: string;
  characterId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

export const appearancePartUpdateTranslationService = async ({
  appearancePartId,
  text,
  textFieldName,
  currentLanguage,
  characterId,
}: UpdateAppearancePartTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "AppearancePart" });

  const existingAppearancePart = await TranslationAppearancePart.findOne({
    language: currentLanguage,
    appearancePartId,
  }).exec();

  if (existingAppearancePart) {
    const currentTextFieldName = existingAppearancePart.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingAppearancePart.translations.push({
        text,
        textFieldName,
      });
    }

    return await existingAppearancePart.save();
  } else {
    validateMongoId({ value: characterId, valueName: "Character" });
    return await TranslationAppearancePart.create({
      appearancePartId,
      language: currentLanguage,
      characterId,
      type: textFieldName,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
