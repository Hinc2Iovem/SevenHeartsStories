import createHttpError from "http-errors";
import { Types } from "mongoose";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Episode from "../../models/StoryData/Episode";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";
import Season from "../../models/StoryData/Season";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation";
import PlotFieldCommand from "../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../../models/StoryEditor/Topology/TopologyBlockInfo";
import { validateMongoId } from "../../utils/validateMongoId";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { EpisodeStatuses } from "../../consts/EPISODE_STATUSES";

type GetEpisodesBySeasonId = {
  seasonId: string;
};

export const episodesGetBySeasonIdService = async ({
  seasonId,
}: GetEpisodesBySeasonId) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  const existingEpisodes = await Episode.find({ seasonId }).lean();
  if (!existingEpisodes.length) {
    return [];
  }

  return existingEpisodes;
};

type GetEpisodeByEpisodeId = {
  episodeId: string;
};

export const episodeGetByEpisodeIdService = async ({
  episodeId,
}: GetEpisodeByEpisodeId) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).lean();
  if (!existingEpisode) {
    return null;
  }

  return existingEpisode;
};

type EpisodeCreateTypes = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
  seasonId: string;
};

export const episodeCreateService = async ({
  seasonId,
  title,
  description,
  currentLanguage,
}: EpisodeCreateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  if (!title?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Title and language are required");
  }

  checkCurrentLanguage({ currentLanguage });

  const allEpisodesBySeasonId = await Episode.find({
    seasonId,
  }).countDocuments();

  const episodeOrder = allEpisodesBySeasonId ? allEpisodesBySeasonId : 0;
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
  const currentSeason = await Season.findById(seasonId);
  if (!currentSeason) {
    throw createHttpError(400, "Season should have a story, firstly");
  }
  const currentStory = await Story.findById(currentSeason?.storyId).exec();
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

  await PlotFieldCommand.create({
    commandOrder: 0,
    topologyBlockId: firstTopologyBlock._id,
  });

  return newEpisode;
};

type EpisodeResetStatusTypes = {
  episodeId: string;
};

export const episodeResetStatusService = async ({
  episodeId,
}: EpisodeResetStatusTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  existingEpisode.episodeStatus = EpisodeStatuses.Doing;

  return await existingEpisode.save();
};

type EpisodeUpdateOrderTypes = {
  episodeId: string;
  newOrder: number;
};

export const episodeUpdateOrderService = async ({
  episodeId,
  newOrder,
}: EpisodeUpdateOrderTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  const seasonId = existingEpisode.seasonId;
  const oldOrder: number = existingEpisode.episodeOrder as number;

  const difference = oldOrder - newOrder;
  if (difference === 1 || difference === -1) {
    const prevEpisode = await Episode.findOne({
      seasonId,
      episodeOrder: newOrder,
    }).exec();
    if (prevEpisode) {
      prevEpisode.episodeOrder = oldOrder;
      await prevEpisode.save();
    }
    existingEpisode.episodeOrder = newOrder;
  } else {
    const allEpisodeIds = [];

    if (oldOrder > newOrder) {
      for (let i = newOrder; i < oldOrder; i++) {
        const episode = await Episode.findOne({
          seasonId,
          episodeOrder: i,
        }).exec();
        if (episode) {
          allEpisodeIds.push(episode._id);
        }
      }

      for (const episodeId of allEpisodeIds) {
        const episode = await Episode.findById(episodeId).exec();
        if (episode) {
          episode.episodeOrder = (episode.episodeOrder as number) + 1;
          await episode.save();
        }
      }
    } else {
      for (let i = oldOrder + 1; i <= newOrder; i++) {
        const episode = await Episode.findOne({
          seasonId,
          episodeOrder: i,
        }).exec();
        if (episode) {
          allEpisodeIds.push(episode._id);
        }
      }

      for (const episodeId of allEpisodeIds) {
        const episode = await Episode.findById(episodeId).exec();
        if (episode) {
          episode.episodeOrder = (episode.episodeOrder as number) - 1;
          await episode.save();
        }
      }
    }

    existingEpisode.episodeOrder = newOrder;
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
