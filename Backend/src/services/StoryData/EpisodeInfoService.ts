import createHttpError from "http-errors";
import Episode from "../../models/StoryData/Episode";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";
import Staff from "../../models/User/Staff";
import { validateMongoId } from "../../utils/validateMongoId";

type EpisodeGetByEpisodeIdAndStaffIdTypes = {
  episodeId: string;
  staffId: string;
};

export const episodeGetByEpisodeIdAndStaffIdService = async ({
  episodeId,
  staffId,
}: EpisodeGetByEpisodeIdAndStaffIdTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });
  validateMongoId({ value: staffId, valueName: "Staff" });

  const existingEpisodes = await EpisodeInfo.find({
    episodeId,
    staffId,
  }).exec();
  if (!existingEpisodes.length) {
    return [];
  }

  return existingEpisodes;
};
type EpisodeGetByEpisodeIdTypes = {
  episodeId: string;
};

export const episodeGetByEpisodeIdService = async ({
  episodeId,
}: EpisodeGetByEpisodeIdTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisodes = await EpisodeInfo.find({ episodeId }).exec();
  if (!existingEpisodes.length) {
    return [];
  }

  return existingEpisodes;
};

type EpisodeAssignWorkerTypes = {
  episodeId: string;
  staffId: string;
};

export const episodeAssignWorkerService = async ({
  episodeId,
  staffId,
}: EpisodeAssignWorkerTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).lean();
  if (!existingEpisode) {
    throw createHttpError(400, `No episode with id: ${episodeId} was found`);
  }
  const existingStaff = await Staff.findById(staffId).lean();
  if (!existingStaff) {
    throw createHttpError(400, `No staff with id: ${staffId} was found`);
  }

  return await EpisodeInfo.create({ episodeId, staffId });
};

type EpisodeUpdateStatusTypes = {
  episodeId: string;
  staffId: string;
  episodeStatus: string | undefined;
};

export const episodeUpdateStatusService = async ({
  episodeId,
  staffId,
  episodeStatus,
}: EpisodeUpdateStatusTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });
  validateMongoId({ value: episodeId, valueName: "Episode" });

  if (!episodeStatus?.trim().length) {
    throw createHttpError(400, "Episodestatus is required");
  }

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, `No episode with id: ${episodeId} was found`);
  }
  const existingStaff = await Staff.findById(staffId).lean();
  if (!existingStaff) {
    throw createHttpError(400, `No staff with id: ${staffId} was found`);
  }
  const existingEpisodeInfo = await EpisodeInfo.findOne({
    episodeId,
    staffId,
  }).exec();
  if (!existingEpisodeInfo) {
    throw createHttpError(400, `No EpisodeInfo was found`);
  }

  existingEpisode.episodeStatus = episodeStatus;
  existingEpisodeInfo.episodeStatus = episodeStatus;

  await existingEpisode.save();
  return await existingEpisodeInfo.save();
};
