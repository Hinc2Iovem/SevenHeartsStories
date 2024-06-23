import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import StoryGenre from "../../models/StoryData/StoryGenre";
import Season from "../../models/StoryData/Season";

type StoryCreateTypes = {
  title: string | undefined;
  imgUrl: string | undefined;
  genres: string[] | undefined;
};

export const storyCreateService = async ({
  genres,
  imgUrl,
  title,
}: StoryCreateTypes) => {
  if (!title?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  const newStory = await Story.create({ title, amountOfEpisodes: 0 });
  if (imgUrl) {
    newStory.imgUrl = imgUrl;
  }

  await Translation.create({
    storyId: newStory._id,
    language: newStory.currentLanguage,
    text: title,
    textFieldName: "storyName",
  });

  await Season.create({
    storyId: newStory._id,
    title: "Season 1",
  });

  if (genres && genres.length) {
    for (const genre of genres) {
      const newStoryGenre = await StoryGenre.create({
        storyId: newStory._id,
        genre,
      });
      await Translation.create({
        storyGenreId: newStoryGenre._id,
        language: newStoryGenre.currentLanguage,
        text: genre,
        textFieldName: "storyGenre",
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

  const existingTranslation = await Translation.findOne({
    storyId: storyId,
    language: existingStory.currentLanguage,
    textFieldName: "storyName",
  }).exec();

  if (title?.trim().length) {
    existingStory.title = title;
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    }
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

  const existingTranslation = await Translation.findOne({
    storyGenreId: existingStoryGenre._id,
    language: existingStoryGenre.currentLanguage,
    textFieldName: "storyGenre",
  }).exec();

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
