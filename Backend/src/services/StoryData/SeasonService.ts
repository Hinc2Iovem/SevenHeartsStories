import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Season from "../../models/StoryData/Season";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";

type SeasonsGetByStoryIdTypes = {
  storyId: string;
};

export const seasonsGetByStoryIdService = async ({
  storyId,
}: SeasonsGetByStoryIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingSeasons = await Season.find({ storyId }).lean();
  if (!existingSeasons.length) {
    return [];
  }

  return existingSeasons;
};

type SeasonCreateTypes = {
  title: string | undefined;
  currentLanguage: string | undefined;
  storyId: string;
};

export const seasonCreateService = async ({
  storyId,
  title,
  currentLanguage,
}: SeasonCreateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, "Such Story doesn't exist");
  }

  if (!title?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Title and language are required");
  }

  checkCurrentLanguage({ currentLanguage });

  const newSeason = await Season.create({
    storyId,
  });
  await Translation.create({
    seasonId: newSeason._id,
    language: currentLanguage,
    text: title,
    textFieldName: TranslationTextFieldName.SeasonName,
  });

  return newSeason;
};

type SeasonDeleteTypes = {
  seasonId: string;
};

export const seasonDeleteService = async ({ seasonId }: SeasonDeleteTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  const existingSeason = await Season.findById(seasonId).exec();

  if (!existingSeason) {
    throw createHttpError(400, "Season with such id doesn't exist");
  }

  await existingSeason.deleteOne();

  return `Season with id ${seasonId} was removed`;
};
