import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import CommandMusic from "../../../../models/StoryEditor/PlotField/Music/CommandMusic";
import Music from "../../../../models/StoryData/Music";

type CreateMusicTypes = {
  plotFieldCommandId: string;
};

export const createMusicService = async ({
  plotFieldCommandId,
}: CreateMusicTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await CommandMusic.create({
    plotFieldCommandId,
  });
};

type UpdateMusicTypes = {
  musicName: string | undefined;
  musicId: string;
  storyId: string;
};

export const updateMusicService = async ({
  musicName,
  musicId,
  storyId,
}: UpdateMusicTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  const existingMusic = await CommandMusic.findById(musicId).exec();
  if (!existingMusic) {
    throw createHttpError(400, "Music with such id wasn't found");
  }

  if (!musicName?.trim().length) {
    throw createHttpError(400, "Music is required");
  }

  const musicLibrary = await Music.findOne({ commandMusicId: musicId }).exec();
  if (musicLibrary) {
    musicLibrary.musicName = musicName;
  } else {
    await Music.create({ musicName, commandMusicId: musicId, storyId });
  }

  existingMusic.musicName = musicName;

  return await existingMusic.save();
};

type DeleteMusicTypes = {
  musicId: string;
};

export const deleteMusicService = async ({ musicId }: DeleteMusicTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  await CommandMusic.findByIdAndDelete(musicId);

  return `Music with id ${musicId} was removed`;
};
