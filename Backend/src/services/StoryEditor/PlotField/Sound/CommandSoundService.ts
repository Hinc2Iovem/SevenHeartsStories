import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Sound from "../../../../models/StoryData/Sound";
import CommandSound from "../../../../models/StoryEditor/PlotField/Sound/CommandSound";

type GetSoundByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getSoundByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetSoundByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingSound = await CommandSound.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingSound) {
    return null;
  }

  return existingSound;
};

type CreateSoundTypes = {
  plotFieldCommandId: string;
  storyId: string;
};

export const createSoundService = async ({
  plotFieldCommandId,
  storyId,
}: CreateSoundTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const newSoundLibrary = await Sound.create({ storyId });

  return await CommandSound.create({
    plotFieldCommandId,
    soundId: newSoundLibrary._id,
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

  if (existingSound) {
    existingSound.soundName = soundName;
    return await existingSound.save();
  } else {
    await Sound.create({ soundName, storyId });
  }
};

type UpdateSoundIsGlobalTypes = {
  isGlobal: boolean | undefined;
  soundId: string;
};

export const updateSoundIsGlobalService = async ({
  isGlobal,
  soundId,
}: UpdateSoundIsGlobalTypes) => {
  validateMongoId({ value: soundId, valueName: "Sound" });

  const existingSound = await Sound.findById(soundId).exec();
  if (!existingSound) {
    throw createHttpError(400, "Sound with such id wasn't found");
  }
  if (isGlobal) {
    existingSound.isGlobal = isGlobal;
  }

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
