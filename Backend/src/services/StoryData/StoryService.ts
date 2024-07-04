import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import Season from "../../models/StoryData/Season";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";

export const storyGetAllService = async () => {
  const existingStories = await Story.find().lean();

  if (!existingStories.length) {
    return [];
  }

  return existingStories;
};

type GetAllStoriesByStatusTypes = {
  storyStatus: string | undefined;
};

export const storyGetAllByStatusService = async ({
  storyStatus,
}: GetAllStoriesByStatusTypes) => {
  if (!storyStatus?.trim().length) {
    throw createHttpError(400, "StoryStatus is required");
  }
  const existingStories = await Story.find({ storyStatus }).lean();

  if (!existingStories.length) {
    return [];
  }

  return existingStories;
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

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: title,
    textFieldName: TranslationTextFieldName.StoryName,
  });

  await Translation.create({
    storyId: newStory._id,
    language: currentLanguage,
    text: description,
    textFieldName: TranslationTextFieldName.StoryDescription,
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
