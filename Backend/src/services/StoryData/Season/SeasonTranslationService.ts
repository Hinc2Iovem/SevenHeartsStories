import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Season from "../../../models/StoryData/Season";
import Story from "../../../models/StoryData/Story";
import TranslationSeason from "../../../models/StoryData/Translation/TranslationSeason";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";

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

type GetSeasonsByTypeSearchId = {
  storyId?: string;
  text?: string;
  currentLanguage?: string;
};

export const getAllSeasonsTranslationsByTypeAndSearchService = async ({
  storyId,
  text,
  currentLanguage,
}: GetSeasonsByTypeSearchId) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }

  const query: { storyId?: string; language: string } = {
    language: currentLanguage,
    storyId: storyId || "",
  };

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
    textFieldName?.trim().length ||
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
