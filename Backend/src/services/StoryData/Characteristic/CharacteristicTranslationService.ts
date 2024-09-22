import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import TranslationCharacteristic, {
  TranslationCharacteristicDocument,
} from "../../../models/StoryData/Translation/TranslationCharacteristic";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";
import CharacterCharacteristic from "../../../models/StoryData/CharacterCharacteristic";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

export const getCharacteristicTranslationUpdatedAtAndLanguageService = async ({
  currentLanguage,
  updatedAt,
  limit,
  page,
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
    (await TranslationCharacteristic.countDocuments({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
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
    (await TranslationCharacteristic.find({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfCharacteristics =
    await TranslationCharacteristic.countDocuments({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    });
  results.amountOfCharacteristics = overAllAmountOfCharacteristics;

  return results;
};

type GetPaginatedCharacteristicsTypes = {
  currentLanguage: string | undefined;
  limit: number | undefined;
  page: number | undefined;
  storyId: string | undefined;
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
  results: TranslationCharacteristicDocument[];
  amountOfCharacteristics: number;
};

export const getPaginatedTranlsationCharacteristicsService = async ({
  currentLanguage,
  limit,
  page,
  storyId,
}: GetPaginatedCharacteristicsTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

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

  if (
    endIndex <
    (await TranslationCharacteristic.countDocuments({
      language: currentLanguage,
      storyId,
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
    (await TranslationCharacteristic.find({
      language: currentLanguage,
      storyId,
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfCharacteristics =
    await TranslationCharacteristic.countDocuments({
      language: currentLanguage,
      storyId,
    });
  results.amountOfCharacteristics = overAllAmountOfCharacteristics;

  return results;
};

type GetCheckCharacteristicTranslationCompletnessByStoryIdTypes = {
  storyId: string;
  currentLanguage: string | undefined;
  translateToLanguage: string | undefined;
};

export const getCheckCharacteristicTranslationCompletnessByStoryIdService =
  async ({
    storyId,
    currentLanguage,
    translateToLanguage,
  }: GetCheckCharacteristicTranslationCompletnessByStoryIdTypes) => {
    validateMongoId({ value: storyId, valueName: "Story" });
    if (
      !currentLanguage?.trim().length ||
      !translateToLanguage?.trim().length
    ) {
      throw createHttpError(400, "CurrentLanguage is required");
    }
    checkCurrentLanguage({ currentLanguage });
    checkCurrentLanguage({ currentLanguage: translateToLanguage });

    const objectTranslateFrom: {
      storyId: string;
      language: string;
    } = {
      storyId,
      language: currentLanguage,
    };

    const objectTranslateTo: {
      storyId: string;
      language: string;
    } = {
      storyId,
      language: translateToLanguage,
    };

    const translateFromCharacteristic =
      await TranslationCharacteristic.countDocuments(objectTranslateFrom);
    const translateToCharacteristic =
      await TranslationCharacteristic.countDocuments(objectTranslateTo);

    if (translateFromCharacteristic === translateToCharacteristic) {
      return true;
    } else {
      return false;
    }
  };

type GetAllCharacteristicsByCharacteristicIdLanguageTypes = {
  currentLanguage?: string;
  characteristicId: string;
};

export const getAllCharacteristicsTranslationsByCharacteristicIdAndLanguageService =
  async ({
    currentLanguage,
    characteristicId,
  }: GetAllCharacteristicsByCharacteristicIdLanguageTypes) => {
    validateMongoId({ value: characteristicId, valueName: "Characteristic" });
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, "CurrentLanguage is required");
    }
    checkCurrentLanguage({ currentLanguage });

    const existingCharacteristics = await TranslationCharacteristic.findOne({
      language: currentLanguage,
      characteristicId,
    }).lean();

    if (!existingCharacteristics) {
      return null;
    }

    return existingCharacteristics;
  };

type GetAllCharacteristicsByLanguageTypes = {
  currentLanguage?: string;
  storyId: string;
};

export const getAllCharacteristicsTranslationsByStoryIdAndLanguageService =
  async ({
    currentLanguage,
    storyId,
  }: GetAllCharacteristicsByLanguageTypes) => {
    validateMongoId({ value: storyId, valueName: "Story" });
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, "CurrentLanguage is required");
    }
    checkCurrentLanguage({ currentLanguage });

    const existingCharacteristics = await TranslationCharacteristic.find({
      language: currentLanguage,
      storyId,
    }).lean();

    if (!existingCharacteristics.length) {
      return [];
    }

    return existingCharacteristics;
  };

type GetCharacteristicByIdAndLanguageTypes = {
  characteristicId: string;
  currentLanguage: string;
};

export const getCharacteristicByIdAndLanguageService = async ({
  characteristicId,
  currentLanguage,
}: GetCharacteristicByIdAndLanguageTypes) => {
  validateMongoId({ value: characteristicId, valueName: "Characteristic" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });
  const existingCharacteristic = await TranslationCharacteristic.findOne({
    characteristicId,
    language: currentLanguage,
  }).lean();

  if (!existingCharacteristic) {
    return null;
  }

  return existingCharacteristic;
};

type CharacteristicCreateTypes = {
  text: string | undefined;
  currentLanguage: string | undefined;
  storyId: string;
};

export const characteristicCreateService = async ({
  storyId,
  currentLanguage,
  text,
}: CharacteristicCreateTypes) => {
  validateMongoId({ value: storyId, valueName: "Season" });
  if (!text?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Text and currentLanguage is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const newCharacteristic = await CharacterCharacteristic.create({ storyId });

  const translations = [
    {
      text: text,
      textFieldName: TranslationTextFieldName.CharacterCharacteristic,
    },
  ];

  return await TranslationCharacteristic.create({
    language: currentLanguage,
    translations,
    storyId,
    characteristicId: newCharacteristic._id,
  });
};

type CharacteristicTranslationUpdateTypes = {
  characteristicId: string;
  currentLanguage: string | undefined;
  text?: string;
  textFieldName?: string;
  storyId?: string;
};

export const characteristicTranslationUpdateService = async ({
  text,
  characteristicId,
  currentLanguage,
  storyId,
  textFieldName,
}: CharacteristicTranslationUpdateTypes) => {
  validateMongoId({ value: characteristicId, valueName: "Characteristic" });
  if (
    !text?.trim().length ||
    !textFieldName?.trim().length ||
    !currentLanguage?.trim().length
  ) {
    throw createHttpError(
      400,
      "Text, textFieldName and currentLanguage are required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const existingCharacteristic = await TranslationCharacteristic.findOne({
    language: currentLanguage,
    characteristicId,
  }).exec();

  if (existingCharacteristic) {
    const currentTextFieldName = existingCharacteristic.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingCharacteristic.translations.push({
        text,
        textFieldName,
        amountOfWords: text?.length || 0,
      });
    }

    return await existingCharacteristic.save();
  } else {
    validateMongoId({ value: storyId, valueName: "Story" });
    return await TranslationCharacteristic.create({
      characteristicId,
      language: currentLanguage,
      storyId,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
