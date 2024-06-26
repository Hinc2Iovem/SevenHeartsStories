import createHttpError from "http-errors";
import Episode from "../../models/StoryData/Episode";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";
import Staff from "../../models/User/Staff";
import { validateMongoId } from "../../utils/validateMongoId";

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
