import createHttpError from "http-errors";
import Music from "../../../../models/StoryData/Music";
import CommandMusic from "../../../../models/StoryEditor/PlotField/Music/CommandMusic";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetMusicByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getMusicByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetMusicByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingMusic = await CommandMusic.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingMusic) {
    return null;
  }

  return existingMusic;
};

type CreateMusicTypes = {
  plotFieldCommandId: string;
  storyId: string;
};

export const createMusicService = async ({
  plotFieldCommandId,
  storyId,
}: CreateMusicTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const newMusicLibrary = await Music.create({ storyId });

  return await CommandMusic.create({
    plotFieldCommandId,
    musicId: newMusicLibrary._id,
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

  if (!musicName?.trim().length) {
    throw createHttpError(400, "Music is required");
  }

  const musicLibrary = await Music.findById(musicId).exec();
  if (musicLibrary) {
    musicLibrary.musicName = musicName;
    return await musicLibrary.save();
  } else {
    return await Music.create({ musicName, storyId });
  }
};

type DeleteMusicTypes = {
  musicId: string;
};

export const deleteMusicService = async ({ musicId }: DeleteMusicTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  await CommandMusic.findByIdAndDelete(musicId);

  return `Music with id ${musicId} was removed`;
};
