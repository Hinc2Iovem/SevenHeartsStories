import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import StoryGenre from "../../models/StoryData/StoryGenre";
import Season from "../../models/StoryData/Season";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type StoryCreateTypes = {
  title: string | undefined;
  imgUrl: string | undefined;
  currentLanguage: string | undefined;
  genres: string[] | undefined;
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

  const newTranslation = await Translation.create({
    language: currentLanguage,
    text: title,
    textFieldName: TranslationTextFieldName.StoryName,
  });

  const newStory = await Story.create({
    title,
    amountOfEpisodes: 0,
    translationId: newTranslation._id,
  });
  if (imgUrl) {
    newStory.imgUrl = imgUrl;
  }

  const newTranslationSeason = await Translation.create({
    language: "english",
    text: "Season 1",
    textFieldName: TranslationTextFieldName.SeasonName,
  });

  await Season.create({
    storyId: newStory._id,
    title: "Season 1",
    translationId: newTranslationSeason._id,
  });

  if (genres && genres.length) {
    for (const genre of genres) {
      const newTranslationGenre = await Translation.create({
        language: currentLanguage,
        text: genre,
        textFieldName: TranslationTextFieldName.StoryGenre,
      });
      await StoryGenre.create({
        storyId: newStory._id,
        genre,
        translationId: newTranslationGenre._id,
      });
    }
  }

  return newStory;
};

type StoryUpdateTypes = {
  storyId: string;
  title: string | undefined;
};

export const storyUpdateTitleService = async ({
  storyId,
  title,
}: StoryUpdateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  const existingTranslation = await Translation.findById(
    existingStory.translationId
  ).exec();

  if (title?.trim().length) {
    existingStory.title = title;
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    }
  }

  return await existingStory.save();
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
  storyGenreId: string;
  genre: string | undefined;
};

export const storyUpdateGenreService = async ({
  storyGenreId,
  genre,
}: StoryUpdateGenreTypes) => {
  validateMongoId({ value: storyGenreId, valueName: "StoryGenre" });

  const existingStoryGenre = await StoryGenre.findById(storyGenreId).exec();

  if (!existingStoryGenre) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  const existingTranslation = await Translation.findById(
    existingStoryGenre.translationId
  ).exec();

  if (genre?.trim().length) {
    existingStoryGenre.genre = genre;
    if (existingTranslation) {
      existingTranslation.text = genre;
      await existingTranslation.save();
    }
  }

  return await existingStoryGenre.save();
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
