import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import EpisodeInfo from "../../models/StoryData/EpisodeInfo";
import Staff from "../../models/User/Staff";
import { Types } from "mongoose";

type EpisodeInfoUpdateTypes = {
  episodeInfoId: string;
  staffId: string;
};

export const episodeInfoUpdateStaffService = async ({
  episodeInfoId,
  staffId,
}: EpisodeInfoUpdateTypes) => {
  validateMongoId({ value: episodeInfoId, valueName: "EpisodeInfo" });
  validateMongoId({ value: staffId, valueName: "Staff" });

  const existingEpisodeInfo = await EpisodeInfo.findById(episodeInfoId).exec();
  const existingStaff = await Staff.findById(staffId).exec();

  if (!existingEpisodeInfo) {
    throw createHttpError(400, "Episode Info with such id doesn't exist");
  }
  if (!existingStaff) {
    throw createHttpError(400, "Staff with such id doesn't exist");
  }

  existingEpisodeInfo.staffId = new Types.ObjectId(staffId);

  return await existingEpisodeInfo.save();
};

type EpisodeInfoUpdateStatusTypes = {
  episodeInfoId: string;
  episodeStatus: string | undefined;
};

export const episodeInfoUpdateStatusService = async ({
  episodeInfoId,
  episodeStatus,
}: EpisodeInfoUpdateStatusTypes) => {
  validateMongoId({ value: episodeInfoId, valueName: "EpisodeInfo" });

  const existingEpisodeInfo = await EpisodeInfo.findById(episodeInfoId).exec();

  if (!existingEpisodeInfo) {
    throw createHttpError(400, "Episode Info with such id doesn't exist");
  }

  if (
    episodeStatus &&
    (episodeStatus === "done" || episodeStatus === "doing")
  ) {
    existingEpisodeInfo.episodeStatus = episodeStatus;
  }

  return await existingEpisodeInfo.save();
};
