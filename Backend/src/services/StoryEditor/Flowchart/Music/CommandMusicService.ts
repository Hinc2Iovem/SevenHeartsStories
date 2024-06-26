import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import CommandMusic from "../../../../models/StoryEditor/Flowchart/Music/CommandMusic";
import Music from "../../../../models/StoryData/Music";

type CreateMusicTypes = {
  flowchartCommandId: string;
};

export const createMusicService = async ({
  flowchartCommandId,
}: CreateMusicTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await CommandMusic.create({
    flowchartCommandId,
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
