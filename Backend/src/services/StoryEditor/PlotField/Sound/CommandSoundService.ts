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
};

export const createSoundService = async ({
  plotFieldCommandId,
}: CreateSoundTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  return await CommandSound.create({
    plotFieldCommandId,
  });
};

type CreateSoundDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
};

export const createSoundDuplicateService = async ({
  topologyBlockId,
  commandOrder,
}: CreateSoundDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    topologyBlockId,
    commandOrder: commandOrder + 1,
  });

  return await CommandSound.create({
    plotFieldCommandId: newPlotfieldCommand._id,
  });
};

type UpdateSoundTypes = {
  soundName: string | undefined;
  commandSoundId: string;
  storyId: string;
};

export const updateSoundService = async ({
  soundName,
  commandSoundId,
  storyId,
}: UpdateSoundTypes) => {
  validateMongoId({ value: commandSoundId, valueName: "CommandSound" });
  validateMongoId({ value: storyId, valueName: "Story" });

  if (!soundName?.trim().length) {
    throw createHttpError(400, "Sound is required");
  }

  const soundLibrary = await Sound.findOne({ soundName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  const soundCommand = await CommandSound.findById(commandSoundId).exec();

  if (!soundLibrary) {
    const newSoundInLibrary = await Sound.create({ soundName, storyId });
    if (soundCommand) {
      soundCommand.soundId = newSoundInLibrary._id;
      return await soundCommand.save();
    } else {
      throw createHttpError(400, "Sound command wasn't even created");
    }
  } else {
    if (soundCommand) {
      soundCommand.soundId = soundLibrary._id;
      return await soundCommand.save();
    } else {
      throw createHttpError(400, "Sound command wasn't even created");
    }
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
