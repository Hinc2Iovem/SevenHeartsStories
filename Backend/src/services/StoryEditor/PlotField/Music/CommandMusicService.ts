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
  commandMusicId: string;
  storyId: string;
};

export const updateMusicService = async ({
  musicName,
  commandMusicId,
  storyId,
}: UpdateMusicTypes) => {
  validateMongoId({ value: commandMusicId, valueName: "CommandMusic" });

  if (!musicName?.trim().length) {
    throw createHttpError(400, "Music is required");
  }

  const musicLibrary = await Music.findOne({ musicName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  const musicCommand = await CommandMusic.findById(commandMusicId).exec();

  if (!musicLibrary) {
    const newMusicInLibrary = await Music.create({ musicName, storyId });
    if (musicCommand) {
      musicCommand.musicId = newMusicInLibrary._id;
      return await musicCommand.save();
    } else {
      throw createHttpError(400, "Music command wasn't even created");
    }
  } else {
    if (musicCommand) {
      musicCommand.musicId = musicLibrary._id;
      return await musicCommand.save();
    } else {
      throw createHttpError(400, "Music command wasn't even created");
    }
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
