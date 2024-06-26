import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Episode from "../../models/StoryData/Episode";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";
import TopologyBlock from "../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../../models/StoryEditor/Topology/TopologyBlockInfo";
import FlowchartCommand from "../../models/StoryEditor/Flowchart/FlowchartCommand";
import Translation from "../../models/StoryData/Translation";
import Season from "../../models/StoryData/Season";
import { Types } from "mongoose";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Story from "../../models/StoryData/Story";

type EpisodeCreateTypes = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
  seasonId: string;
  storyId: string;
};

export const episodeCreateService = async ({
  seasonId,
  storyId,
  title,
  description,
  currentLanguage,
}: EpisodeCreateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  if (!title?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Title and language are required");
  }

  const allEpisodesBySeasonId = await Episode.find({ seasonId }).lean();
  const episodeOrder = allEpisodesBySeasonId.length
    ? allEpisodesBySeasonId.length + 1
    : 1;

  const newEpisode = await Episode.create({
    episodeOrder,
    seasonId,
  });

  await Translation.create({
    text: title,
    textFieldName: TranslationTextFieldName.EpisodeName,
    language: currentLanguage,
    episodeId: newEpisode._id,
  });
  if (description?.trim().length) {
    await Translation.create({
      text: description,
      textFieldName: TranslationTextFieldName.EpisodeDescription,
      language: currentLanguage,
      episodeId: newEpisode._id,
    });
  }
  const currentStory = await Story.findById({ storyId }).exec();
  if (currentStory) {
    currentStory.amountOfEpisodes += 1;
    await currentStory.save();
  }

  const firstTopologyBlock = await TopologyBlock.create({
    coordinatesX: 50,
    coordinatesY: 50,
    episodeId: newEpisode._id,
    name: "First",
    isStartingTopologyBlock: true,
  });

  await TopologyBlockInfo.create({
    amountOfAchievements: 0,
    amountOfAmethysts: 0,
    amountOfAuthorWords: 0,
    amountOfCharacterWords: 0,
    amountOfWords: 0,
    topologyBlockId: firstTopologyBlock._id,
  });

  await FlowchartCommand.create({
    commandOrder: 1,
    topologyBlockId: firstTopologyBlock._id,
  });

  return newEpisode;
};

type EpisodeUpdateTypes = {
  episodeId: string;
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

export const episodeUpdateService = async ({
  episodeId,
  currentLanguage,
  description,
  title,
}: EpisodeUpdateTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  if (title?.trim().length) {
    const existingTranslation = await Translation.findOne({
      episodeId: episodeId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.EpisodeName,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    }
  }
  if (description?.trim().length) {
    const existingTranslation = await Translation.findOne({
      episodeId: episodeId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.EpisodeDescription,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = description;
      await existingTranslation.save();
    }
  }

  return existingEpisode;
};

type EpisodeUpdateSeasonIdTypes = {
  episodeId: string;
  newSeasonId: string;
};

export const episodeUpdateSeasonIdService = async ({
  episodeId,
  newSeasonId,
}: EpisodeUpdateSeasonIdTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });
  validateMongoId({ value: newSeasonId, valueName: "Season" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  const existingSeason = await Season.findById(newSeasonId).exec();

  if (!existingSeason) {
    throw createHttpError(400, "Season with such id doesn't exist");
  }

  existingEpisode.seasonId = new Types.ObjectId(newSeasonId);

  return await existingEpisode.save();
};

type EpisodeDeleteTypes = {
  episodeId: string;
};

export const episodeDeleteService = async ({
  episodeId,
}: EpisodeDeleteTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  await existingEpisode.deleteOne();

  const existingEpisodeInfo = await EpisodeInfo.findOne({ episodeId }).exec();
  if (existingEpisodeInfo) {
    await existingEpisodeInfo.deleteOne();
  }
  return `Episode with id ${episodeId} was removed`;
};
