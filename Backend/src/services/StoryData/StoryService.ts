import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import Season from "../../models/StoryData/Season";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type StoryCreateTypes = {
  title: string | undefined;
  imgUrl: string | undefined;
  currentLanguage: string | undefined;
  genres: string | undefined;
};

export const storyCreateService = async ({
  genres,
  imgUrl,
  currentLanguage,
  title,
}: StoryCreateTypes) => {
  if (!title?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  const newStory = await Story.create({
    amountOfEpisodes: 0,
  });

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: title,
    textFieldName: TranslationTextFieldName.StoryName,
  });

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: genres,
    textFieldName: TranslationTextFieldName.StoryGenre,
  });

  if (imgUrl) {
    newStory.imgUrl = imgUrl;
  }

  const newSeason = await Season.create({
    storyId: newStory._id,
  });

  await Translation.create({
    seasonId: newSeason._id,
    language: "english",
    text: "Season 1",
    textFieldName: TranslationTextFieldName.SeasonName,
  });

  return newStory;
};

type StoryUpdateTypes = {
  storyId: string;
  title: string | undefined;
  currentLanguage: string | undefined;
};

export const storyUpdateTitleService = async ({
  storyId,
  title,
  currentLanguage,
}: StoryUpdateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  const existingTranslation = await Translation.findOne({
    storyId: existingStory.id,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.StoryName,
  }).exec();

  if (!existingTranslation) {
    throw createHttpError(400, "Translation wasn't found");
  }

  if (title?.trim().length) {
    existingTranslation.text = title;
    await existingTranslation.save();
  }

  return existingStory;
};

type StoryUpdateImgTypes = {
  storyId: string;
  imgUrl: string | undefined;
};

export const storyUpdateImgService = async ({
  storyId,
  imgUrl,
}: StoryUpdateImgTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  if (imgUrl?.trim().length) {
    existingStory.imgUrl = imgUrl;
  }

  return await existingStory.save();
};

type StoryUpdateGenreTypes = {
  storyId: string;
  genre: string | undefined;
  currentLanguage: string | undefined;
};

export const storyUpdateGenreService = async ({
  storyId,
  genre,
  currentLanguage,
}: StoryUpdateGenreTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById({ storyId }).lean();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  const existingTranslation = await Translation.findOne({
    storyId,
    textFieldName: TranslationTextFieldName.StoryGenre,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation) {
    throw createHttpError(400, "Translation wasn't found");
  }

  if (genre?.trim().length) {
    existingTranslation.text = genre;
    await existingTranslation.save();
  }

  return existingTranslation;
};

type StoryDeleteTypes = {
  storyId: string;
};

export const storyDeleteService = async ({ storyId }: StoryDeleteTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  await existingStory.deleteOne();

  return `Story with id ${storyId} was removed`;
};
