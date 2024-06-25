import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Episode from "../../models/StoryData/Episode";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";
import TopologyBlock from "../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../../models/StoryEditor/Topology/TopologyBlockInfo";
import FlowchartCommand from "../../models/StoryEditor/Flowchart/FlowchartCommand";
import Flowchart from "../../models/StoryEditor/Flowchart/Flowchart";
import Translation from "../../models/StoryData/Translation";
import Season from "../../models/StoryData/Season";
import { Types } from "mongoose";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Story from "../../models/StoryData/Story";

type EpisodeCreateTypes = {
  title: string | undefined;
  currentLanguage: string | undefined;
  seasonId: string;
  storyId: string;
};

export const episodeCreateService = async ({
  seasonId,
  storyId,
  title,
  currentLanguage,
}: EpisodeCreateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  if (!title?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Title and language are required");
  }

  const allEpisodesBySeasonId = await Episode.find({ seasonId }).lean();
  const episodeNumber = allEpisodesBySeasonId.length
    ? allEpisodesBySeasonId.length + 1
    : 1;

  const newTranslation = await Translation.create({
    text: title,
    textFieldName: TranslationTextFieldName.EpisodeName,
    language: currentLanguage,
  });

  const newEpisode = await Episode.create({
    episodeNumber,
    seasonId,
    title,
    translationId: newTranslation._id,
  });
  const currentStory = await Story.findById({ storyId }).exec();
  if (currentStory) {
    currentStory.amountOfEpisodes += 1;
    await currentStory.save();
  }

  await EpisodeInfo.create({
    episodeId: newEpisode._id,
  });

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

  const firstFlowChart = await Flowchart.create({
    topologyBlockId: firstTopologyBlock._id,
  });

  await FlowchartCommand.create({
    commandOrder: 1,
    flowchartId: firstFlowChart._id,
  });

  return newEpisode;
};

type EpisodeUpdateTypes = {
  episodeId: string;
  title: string | undefined;
};

export const episodeUpdateService = async ({
  episodeId,
  title,
}: EpisodeUpdateTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  const existingTranslation = await Translation.findById(
    existingEpisode.translationId
  ).exec();

  if (title?.trim().length) {
    existingEpisode.title = title;
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    }
  }

  return await existingEpisode.save();
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
