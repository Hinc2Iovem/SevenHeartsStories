import createHttpError from "http-errors";
import Music from "../../../../models/StoryEditor/Flowchart/Music/Music";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

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

  return await Music.create({
    flowchartCommandId,
  });
};

type UpdateMusicTypes = {
  musicName: string | undefined;
  musicId: string;
};

export const updateMusicService = async ({
  musicName,
  musicId,
}: UpdateMusicTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  const existingMusic = await Music.findById(musicId).exec();
  if (!existingMusic) {
    throw createHttpError(400, "Music with such id wasn't found");
  }

  if (!musicName?.trim().length) {
    throw createHttpError(400, "Music is required");
  }

  existingMusic.musicName = musicName;

  return await existingMusic.save();
};

type DeleteMusicTypes = {
  musicId: string;
};

export const deleteMusicService = async ({ musicId }: DeleteMusicTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  await Music.findByIdAndDelete(musicId);

  return `Music with id ${musicId} was removed`;
};
