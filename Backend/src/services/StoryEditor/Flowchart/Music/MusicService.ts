import createHttpError from "http-errors";
import Music from "../../../../models/StoryEditor/Flowchart/Music/Music";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";

type CreateMusicTypes = {
  musicName: string | undefined;
  flowchartCommandId: string;
};

export const createMusicService = async ({
  musicName,
  flowchartCommandId,
}: CreateMusicTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!musicName?.trim().length) {
    throw createHttpError(400, "Music is required");
  }

  return await Music.create({
    musicName,
    flowchartCommandId,
  });
};

type DeleteMusicTypes = {
  musicId: string;
};

export const deleteMusicService = async ({ musicId }: DeleteMusicTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  await Music.findByIdAndDelete(musicId);

  return `Music with id ${musicId} was removed`;
};
