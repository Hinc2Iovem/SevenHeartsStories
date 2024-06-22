import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Sound from "../../../../models/StoryData/Sound";
import CommandSound from "../../../../models/StoryEditor/Flowchart/Sound/CommandSound";

type CreateSoundTypes = {
  soundName: string | undefined;
  flowchartCommandId: string;
  storyId: string;
};

export const createSoundService = async ({
  soundName,
  storyId,
  flowchartCommandId,
}: CreateSoundTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  if (!soundName?.trim().length) {
    throw createHttpError(400, "Sound is required");
  }

  await Sound.create({ soundName, storyId });

  return await CommandSound.create({
    soundName,
    flowchartCommandId,
  });
};

type DeleteSoundTypes = {
  soundId: string;
};

export const deleteSoundService = async ({ soundId }: DeleteSoundTypes) => {
  validateMongoId({ value: soundId, valueName: "Sound" });

  await CommandSound.findByIdAndDelete(soundId);

  return `Sound with id ${soundId} was removed`;
};
