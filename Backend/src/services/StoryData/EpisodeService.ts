import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import Episode from "../../models/StoryData/Episode";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";

type EpisodeCreateTypes = {
  title: string | undefined;
  seasonId: string;
};

export const episodeCreateService = async ({
  seasonId,
  title,
}: EpisodeCreateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  if (!title?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  const allEpisodesBySeasonId = await Episode.find({ seasonId }).lean();
  const episodeNumber = allEpisodesBySeasonId.length
    ? allEpisodesBySeasonId.length + 1
    : 1;

  const newEpisode = await Episode.create({ episodeNumber, seasonId, title });

  await EpisodeInfo.create({
    episodeId: newEpisode._id,
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

  if (title?.trim().length) {
    existingEpisode.title = title;
  }

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
