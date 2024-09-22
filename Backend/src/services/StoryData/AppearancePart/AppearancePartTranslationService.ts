import createHttpError from "http-errors";
import {
  AppearanceParts,
  AppearancePartsTypes,
} from "../../../consts/APPEARANCE_PARTS";
import AppearancePart from "../../../models/StoryData/AppearancePart";
import TranslationAppearancePart, {
  TranslationAppearancePartDocument,
} from "../../../models/StoryData/Translation/TranslationAppearancePart";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

export const getPaginatedAppearancePartTranslationUpdatedAtAndLanguageService =
  async ({
    currentLanguage,
    updatedAt,
    page,
    limit,
  }: GetByUpdatedAtAndLanguageTypes) => {
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, "Language is required");
    }

    checkCurrentLanguage({ currentLanguage });

    if (!page || !limit) {
      throw createHttpError(400, "Page and limit are required");
    }

    let startDate: Date | undefined;
    let endDate = new Date();

    switch (updatedAt) {
      case "30min":
        startDate = subMinutes(endDate, 30);
        break;
      case "1hr":
        startDate = subHours(endDate, 1);
        break;
      case "5hr":
        startDate = subHours(endDate, 5);
        break;
      case "1d":
        startDate = subDays(endDate, 1);
        break;
      case "3d":
        startDate = subDays(endDate, 3);
        break;
      case "7d":
        startDate = subDays(endDate, 7);
        break;
      default:
        throw createHttpError(400, "Invalid updatedAt value");
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;

    const results = {} as ResultTypes;

    if (
      endIndex <
      (await TranslationAppearancePart.countDocuments({
        updatedAt: { $gte: startDate, $lt: endDate },
        language: currentLanguage,
      }).exec())
    ) {
      results.next = {
        page: pageNumber + 1,
        limit: limitNumber,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: pageNumber - 1,
        limit: limitNumber,
      };
    }
    results.results =
      (await TranslationAppearancePart.find({
        updatedAt: { $gte: startDate, $lt: endDate },
        language: currentLanguage,
      })
        .limit(limitNumber)
        .skip(startIndex)
        .exec()) || [];
    const overAllAmountOfAppearanceParts =
      await TranslationAppearancePart.countDocuments({
        updatedAt: { $gte: startDate, $lt: endDate },
        language: currentLanguage,
      });
    results.amountOfAppearanceParts = overAllAmountOfAppearanceParts;

    return results;
  };

type GetPaginatedAppearancePartsTypes = {
  currentLanguage: string | undefined;
  limit: number | undefined;
  page: number | undefined;
  characterId: string | undefined;
  type: string | undefined;
};

type ResultTypes = {
  next: {
    page: number;
    limit: number;
  };
  prev: {
    page: number;
    limit: number;
  };
  results: TranslationAppearancePartDocument[];
  amountOfAppearanceParts: number;
};

export const getPaginatedTranlsationAppearancePartsService = async ({
  currentLanguage,
  limit,
  page,
  characterId,
  type,
}: GetPaginatedAppearancePartsTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }
  checkCurrentLanguage({ currentLanguage });

  if (!page || !limit) {
    throw createHttpError(400, "Page and limit are required");
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const results = {} as ResultTypes;

  const queryObj: {
    language: string;
    characterId: string | undefined;
    type?: string;
  } = {
    language: currentLanguage,
    characterId,
  };

  if (type?.trim().length) {
    queryObj.type = type;
  }

  if (
    endIndex < (await TranslationAppearancePart.countDocuments(queryObj).exec())
  ) {
    results.next = {
      page: pageNumber + 1,
      limit: limitNumber,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: pageNumber - 1,
      limit: limitNumber,
    };
  }
  results.results =
    (await TranslationAppearancePart.find(queryObj)
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfAppearanceParts =
    await TranslationAppearancePart.countDocuments(queryObj);
  results.amountOfAppearanceParts = overAllAmountOfAppearanceParts;

  return results;
};

type GetCheckAppearancePartTranslationCompletnessByCharacterIdTypes = {
  characterId: string;
  currentLanguage: string | undefined;
  translateToLanguage: string | undefined;
  appearancePartVariation: string | undefined;
};

export const getCheckAppearancePartTranslationCompletnessByCharacterIdService =
  async ({
    characterId,
    currentLanguage,
    appearancePartVariation,
    translateToLanguage,
  }: GetCheckAppearancePartTranslationCompletnessByCharacterIdTypes) => {
    validateMongoId({ value: characterId, valueName: "Character" });
    if (
      !currentLanguage?.trim().length ||
      !translateToLanguage?.trim().length
    ) {
      throw createHttpError(400, "CurrentLanguage is required");
    }
    checkCurrentLanguage({ currentLanguage });
    checkCurrentLanguage({ currentLanguage: translateToLanguage });

    const objectTranslateFrom: {
      characterId: string;
      language: string;
      appearancePartVariation?: string;
    } = {
      characterId,
      language: currentLanguage,
    };

    const objectTranslateTo: {
      characterId: string;
      language: string;
      appearancePartVariation?: string;
    } = {
      characterId,
      language: translateToLanguage,
    };

    if (appearancePartVariation?.trim().length) {
      objectTranslateFrom.appearancePartVariation = appearancePartVariation;
      objectTranslateTo.appearancePartVariation = appearancePartVariation;
    }

    const translateFromAppearancePart =
      await TranslationAppearancePart.countDocuments(objectTranslateFrom);
    const translateToAppearancePart =
      await TranslationAppearancePart.countDocuments(objectTranslateTo);

    if (translateFromAppearancePart === translateToAppearancePart) {
      return true;
    } else {
      return false;
    }
  };

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
  textFieldName: string;
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
        amountOfWords: text?.length || 0,
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
