import { subDays, subHours, subMinutes } from "date-fns";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Season from "../../../models/StoryData/Season";
import Story from "../../../models/StoryData/Story";
import TranslationSeason from "../../../models/StoryData/Translation/TranslationSeason";
import TranslationStory, {
  TranslationStoryDocument,
} from "../../../models/StoryData/Translation/TranslationStory";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

export const getPaginatedStoryTranslationUpdatedAtAndLanguageService = async ({
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
    (await TranslationStory.countDocuments({
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
    (await TranslationStory.find({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfStories = await TranslationStory.countDocuments({
    language: currentLanguage,
    updatedAt: { $gte: startDate, $lt: endDate },
  });
  results.amountOfStories = overAllAmountOfStories;

  return results;
};

type GetPaginatedStoriesTypes = {
  currentLanguage: string | undefined;
  limit: number | undefined;
  page: number | undefined;
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
  results: TranslationStoryDocument[];
  amountOfStories: number;
};

export const getPaginatedTranlsationStoriesService = async ({
  currentLanguage,
  limit,
  page,
}: GetPaginatedStoriesTypes) => {
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
    (await TranslationStory.countDocuments({
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
    (await TranslationStory.find({ language: currentLanguage })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfStories = await TranslationStory.countDocuments({
    language: currentLanguage,
  });
  results.amountOfStories = overAllAmountOfStories;

  return results;
};

type GetAllAssignedStoriesByLanguageAndStaffIdTypes = {
  currentLanguage?: string;
  staffId: string;
  storyStatus?: string;
  text?: string;
};

export const getAllAssignedStoriesTranslationsByLanguageAndStaffIdService =
  async ({
    currentLanguage,
    staffId,
    storyStatus,
    text,
  }: GetAllAssignedStoriesByLanguageAndStaffIdTypes) => {
    validateMongoId({ value: staffId, valueName: "Staff" });

    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, "CurrentLanguage is required");
    }
    checkCurrentLanguage({ currentLanguage });

    const allAssignedStories = await Story.find({
      storyStaffInfo: {
        $elemMatch: {
          staffId,
          ...(storyStatus?.trim().length && { storyStatus }),
        },
      },
    });

    if (!allAssignedStories.length) {
      return [];
    }

    const allTranslatedAssignedStories = [];
    for (const s of allAssignedStories) {
      const translationQuery: {
        language: string;
        storyId: mongoose.Types.ObjectId;
        "translations.0.text"?: { $regex: string; $options: string };
      } = {
        language: currentLanguage,
        storyId: s._id as mongoose.Types.ObjectId,
      };

      if (text?.trim().length) {
        translationQuery["translations.0.text"] = {
          $regex: text,
          $options: "i",
        };
      }

      const existingStory = await TranslationStory.findOne(
        translationQuery
      ).lean();
      if (existingStory) {
        allTranslatedAssignedStories.push(existingStory);
      }
    }

    return allTranslatedAssignedStories;
  };

type GetAllStoriesByLanguageTypes = {
  currentLanguage: string;
};

export const getAllStoriesTranslationsByLanguageService = async ({
  currentLanguage,
}: GetAllStoriesByLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });

  const existingStories = await TranslationStory.find({
    language: currentLanguage,
  }).lean();

  if (!existingStories.length) {
    return [];
  }

  return existingStories;
};

type GetStoriesByTypeSearchId = {
  storyStatus?: string;
  text?: string;
  currentLanguage?: string;
};

export const getAllStoriesTranslationsByTypeAndSearchService = async ({
  storyStatus,
  text,
  currentLanguage,
}: GetStoriesByTypeSearchId) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }

  const query: { storyStatus?: string; language: string } = {
    language: currentLanguage,
  };

  if (storyStatus) {
    query.storyStatus = storyStatus;
  }

  const existingStories = await TranslationStory.find(query).exec();

  if (!existingStories.length) {
    return [];
  }

  const filteredStories = text?.trim().length
    ? existingStories.filter((ec) =>
        ec.translations[0].text?.toLowerCase()?.includes(text.toLowerCase())
      )
    : existingStories;

  return filteredStories;
};

type GetStoryByIdAndLanguageTypes = {
  storyId: string;
  currentLanguage: string;
};

export const getStoryByIdAndLanguageService = async ({
  storyId,
  currentLanguage,
}: GetStoryByIdAndLanguageTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });
  const existingStory = await TranslationStory.findOne({
    storyId,
    language: currentLanguage,
  }).lean();

  if (!existingStory) {
    return null;
  }

  return existingStory;
};

type StoryCreateTypes = {
  title: string | undefined;
  description: string | undefined;
  imgUrl: string | undefined;
  currentLanguage: string | undefined;
  genres: string | undefined;
};

export const storyCreateService = async ({
  genres,
  imgUrl,
  currentLanguage,
  description,
  title,
}: StoryCreateTypes) => {
  if (
    !title?.trim().length ||
    !description?.trim().length ||
    !currentLanguage?.trim().length
  ) {
    throw createHttpError(
      400,
      "Title, description and currentLanguage is required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const newStory = await Story.create({
    amountOfEpisodes: 0,
  });
  if (imgUrl) {
    newStory.imgUrl = imgUrl;
  }

  const translations = [
    {
      text: title,
      textFieldName: TranslationTextFieldName.StoryName,
    },
    {
      text: description,
      textFieldName: TranslationTextFieldName.StoryDescription,
    },
    {
      text: genres,
      textFieldName: TranslationTextFieldName.StoryGenre,
    },
  ];
  await TranslationStory.create({
    storyId: newStory._id,
    language: currentLanguage,
    translations,
  });

  const newSeason = await Season.create({
    storyId: newStory._id,
  });

  const seasonTranslations = [
    {
      text: "Сезон 1",
      textFieldName: TranslationTextFieldName.SeasonName,
    },
  ];

  await TranslationSeason.create({
    seasonId: newSeason._id,
    storyId: newStory._id,
    translations: seasonTranslations,
    language: "russian",
  });

  return newStory;
};

type StoryTranslationUpdateTypes = {
  storyId: string;
  currentLanguage: string | undefined;
  text?: string;
  textFieldName?: string;
};

export const storyTranslationUpdateService = async ({
  text,
  storyId,
  currentLanguage,
  textFieldName,
}: StoryTranslationUpdateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
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

  const existingStory = await TranslationStory.findOne({
    language: currentLanguage,
    storyId,
  }).exec();

  if (existingStory) {
    const currentTextFieldName = existingStory.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingStory.translations.push({
        text,
        textFieldName,
        amountOfWords: text.length,
      });
    }

    return await existingStory.save();
  } else {
    validateMongoId({ value: storyId, valueName: "Story" });
    return await TranslationStory.create({
      storyId,
      language: currentLanguage,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
