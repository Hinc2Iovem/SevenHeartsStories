import createHttpError from "http-errors";
import { Types } from "mongoose";
import Episode from "../../../models/StoryData/Episode";
import { validateMongoId } from "../../../utils/validateMongoId";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Translation from "../../../models/StoryData/Translation/Translation";
import { EpisodeStatuses } from "../../../consts/EPISODE_STATUSES";
import EpisodeInfo from "../../../models/StoryData/EpisodeInfo";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import Story from "../../../models/StoryData/Story";
import Season from "../../../models/StoryData/Season";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";

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
