import createHttpError from "http-errors";
import mongoose from "mongoose";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Season from "../../../models/StoryData/Season";
import TranslationSeason, {
  TranslationSeasonDocument,
} from "../../../models/StoryData/Translation/TranslationSeason";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

export const getPaginatedSeasonTranslationUpdatedAtAndLanguageService = async ({
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
    (await TranslationSeason.countDocuments({
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
    (await TranslationSeason.find({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];

  const overAllAmountOfSeasons = await TranslationSeason.countDocuments({
    language: currentLanguage,
    updatedAt: { $gte: startDate, $lt: endDate },
  });
  results.amountOfSeasons = overAllAmountOfSeasons;

  return results;
};

type GetPaginatedSeasonsTypes = {
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
  results: TranslationSeasonDocument[];
  amountOfSeasons: number;
};

export const getPaginatedTranlsationSeasonsService = async ({
  currentLanguage,
  limit,
  page,
  storyId,
}: GetPaginatedSeasonsTypes) => {
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
    (await TranslationSeason.countDocuments({
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
    (await TranslationSeason.find({
      language: currentLanguage,
      storyId,
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfSeasons = await TranslationSeason.countDocuments({
    language: currentLanguage,
    storyId,
  });
  results.amountOfSeasons = overAllAmountOfSeasons;

  return results;
};

type GetCheckSeasonTranslationCompletnessByStoryIdTypes = {
  storyId: string;
  currentLanguage: string | undefined;
  translateToLanguage: string | undefined;
};

export const getCheckSeasonTranslationCompletnessByStoryIdService = async ({
  storyId,
  currentLanguage,
  translateToLanguage,
}: GetCheckSeasonTranslationCompletnessByStoryIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!currentLanguage?.trim().length || !translateToLanguage?.trim().length) {
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

  const translateFromSeason = await TranslationSeason.countDocuments(
    objectTranslateFrom
  );
  const translateToSeason = await TranslationSeason.countDocuments(
    objectTranslateTo
  );

  if (translateFromSeason === translateToSeason) {
    return true;
  } else {
    return false;
  }
};

type GetAllSeasonsByLanguageTypes = {
  currentLanguage?: string;
  storyId: string;
};

export const getAllSeasonsTranslationsByStoryIdAndLanguageService = async ({
  currentLanguage,
  storyId,
}: GetAllSeasonsByLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });

  const existingSeasons = await TranslationSeason.find({
    language: currentLanguage,
    storyId,
  }).lean();

  if (!existingSeasons.length) {
    return [];
  }

  return existingSeasons;
};

type GetSeasonsSearchId = {
  storyId?: string;
  text?: string;
  currentLanguage?: string;
};

export const getAllSeasonsTranslationsAndSearchService = async ({
  storyId,
  text,
  currentLanguage,
}: GetSeasonsSearchId) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }

  const query: { storyId?: mongoose.Types.ObjectId; language: string } = {
    language: currentLanguage,
  };

  if (storyId) {
    query.storyId = new mongoose.Types.ObjectId(storyId);
  }

  const existingSeasons = await TranslationSeason.find(query).exec();

  if (!existingSeasons.length) {
    return [];
  }

  const filteredSeasons = text?.trim().length
    ? existingSeasons.filter((ec) =>
        ec.translations[0].text?.toLowerCase()?.includes(text.toLowerCase())
      )
    : existingSeasons;

  return filteredSeasons;
};

type GetSeasonByIdAndLanguageTypes = {
  seasonId: string;
  currentLanguage: string;
};

export const getSeasonByIdAndLanguageService = async ({
  seasonId,
  currentLanguage,
}: GetSeasonByIdAndLanguageTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });
  const existingSeason = await TranslationSeason.findOne({
    seasonId,
    language: currentLanguage,
  }).lean();

  if (!existingSeason) {
    return null;
  }

  return existingSeason;
};

type SeasonCreateTypes = {
  title: string | undefined;
  currentLanguage: string | undefined;
  storyId: string;
};

export const seasonCreateService = async ({
  storyId,
  currentLanguage,
  title,
}: SeasonCreateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!title?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(
      400,
      "Title, description and currentLanguage is required"
    );
  }

  checkCurrentLanguage({ currentLanguage });
  const newSeason = await Season.create({
    storyId,
  });

  const translations = [
    {
      text: title,
      textFieldName: TranslationTextFieldName.SeasonName,
    },
  ];

  const newSeasonTranslation = await TranslationSeason.create({
    seasonId: newSeason._id,
    language: currentLanguage,
    translations,
    storyId,
  });

  return newSeasonTranslation;
};

type SeasonTranslationUpdateTypes = {
  seasonId: string;
  currentLanguage: string | undefined;
  text?: string;
  textFieldName?: string;
  storyId?: string;
};

export const seasonTranslationUpdateService = async ({
  text,
  storyId,
  currentLanguage,
  seasonId,
  textFieldName,
}: SeasonTranslationUpdateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });
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

  const existingSeason = await TranslationSeason.findOne({
    language: currentLanguage,
    seasonId,
  }).exec();

  if (existingSeason) {
    const currentTextFieldName = existingSeason.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingSeason.translations.push({
        text,
        textFieldName,
        amountOfWords: text?.length || 0,
      });
    }

    return await existingSeason.save();
  } else {
    validateMongoId({ value: storyId, valueName: "Story" });
    return await TranslationSeason.create({
      seasonId,
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
