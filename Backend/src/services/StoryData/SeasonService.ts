import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Season from "../../models/StoryData/Season";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type SeasonCreateTypes = {
  title: string | undefined;
  storyId: string;
};

export const seasonCreateService = async ({
  storyId,
  title,
}: SeasonCreateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, "Such Story doesn't exist");
  }

  if (!title?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  const newSeason = await Season.create({ title, storyId });

  await Translation.create({
    seasonId: newSeason._id,
    language: newSeason.currentLanguage,
    text: title,
    textFieldName: TranslationTextFieldName.SeasonName,
  });

  return newSeason;
};

type SeasonUpdateTypes = {
  seasonId: string;
  title: string | undefined;
};

export const seasonUpdateTitleService = async ({
  seasonId,
  title,
}: SeasonUpdateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  const existingSeason = await Season.findById(seasonId).exec();

  if (!existingSeason) {
    throw createHttpError(400, "Season with such id doesn't exist");
  }

  const existingTranslation = await Translation.findOne({
    seasonId: seasonId,
    language: existingSeason.currentLanguage,
    textFieldName: TranslationTextFieldName.SeasonName,
  }).exec();

  if (title?.trim().length) {
    existingSeason.title = title;
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    }
  }

  return await existingSeason.save();
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
