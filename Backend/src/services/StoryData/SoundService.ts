import Sound from "../../models/StoryData/Sound";
import { validateMongoId } from "../../utils/validateMongoId";

export const getAllSoundsService = async () => {
  const allSound = await Sound.find().lean();
  if (!allSound.length) {
    return [];
  }

  return allSound;
};

type GetSoundTypes = {
  storyId: string;
};

export const getSoundsByStoryIdService = async ({ storyId }: GetSoundTypes) => {
  validateMongoId({ value: storyId, valueName: "story" });

  const allSound = await Sound.find({ storyId }).lean();
  if (!allSound.length) {
    return [];
  }

  return allSound;
};

type GetSoundByIdTypes = {
  soundId: string;
};

export const getSoundByIdService = async ({ soundId }: GetSoundByIdTypes) => {
  validateMongoId({ value: soundId, valueName: "Sound" });

  const soundById = await Sound.findById(soundId).lean();
  if (!soundById) {
    return null;
  }

  return soundById;
};
