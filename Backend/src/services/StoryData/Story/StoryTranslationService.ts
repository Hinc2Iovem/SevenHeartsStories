import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { StoryStatusTypes } from "../../../controllers/StoryData/Story/StoryController";
import Season from "../../../models/StoryData/Season";
import Story from "../../../models/StoryData/Story";
import Translation from "../../../models/StoryData/Translation/Translation";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";
import TranslationStory from "../../../models/StoryData/Translation/TranslationStory";

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

  await Translation.create({
    seasonId: newSeason._id,
    language: "russian",
    text: "Сезон 1",
    textFieldName: TranslationTextFieldName.SeasonName,
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
    textFieldName?.trim().length ||
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
