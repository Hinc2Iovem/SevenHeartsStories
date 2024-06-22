import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Sound from "../../../../models/StoryData/Sound";
import CommandSound from "../../../../models/StoryEditor/Flowchart/Sound/CommandSound";

type CreateSoundTypes = {
  flowchartCommandId: string;
};

export const createSoundService = async ({
  flowchartCommandId,
}: CreateSoundTypes) => {
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  return await CommandSound.create({
    flowchartCommandId,
  });
};

type UpdateSoundTypes = {
  soundName: string | undefined;
  soundId: string;
  storyId: string;
};

export const updateSoundService = async ({
  soundName,
  storyId,
  soundId,
}: UpdateSoundTypes) => {
  validateMongoId({ value: soundId, valueName: "Sound" });
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingSound = await Sound.findById(soundId).exec();
  if (!existingSound) {
    throw createHttpError(400, "Sound with such id wasn't found");
  }

  if (!soundName?.trim().length) {
    throw createHttpError(400, "Sound is required");
  }

  existingSound.soundName = soundName;
  await Sound.create({ soundName, storyId });

  return await existingSound.save();
};

type DeleteSoundTypes = {
  soundId: string;
};

export const deleteSoundService = async ({ soundId }: DeleteSoundTypes) => {
  validateMongoId({ value: soundId, valueName: "Sound" });

  await CommandSound.findByIdAndDelete(soundId);

  return `Sound with id ${soundId} was removed`;
};
