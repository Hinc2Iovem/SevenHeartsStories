import Music from "../../models/StoryData/Music";
import { validateMongoId } from "../../utils/validateMongoId";

type GetMusicTypes = {
  storyId: string;
};

export const getMusicService = async ({ storyId }: GetMusicTypes) => {
  validateMongoId({ value: storyId, valueName: "story" });

  const allMusic = await Music.find({ storyId }).lean();
  if (!allMusic.length) {
    return [];
  }

  return allMusic;
};

type GetMusicByIdTypes = {
  musicId: string;
};

export const getMusicByIdService = async ({ musicId }: GetMusicByIdTypes) => {
  validateMongoId({ value: musicId, valueName: "Music" });

  const musicById = await Music.findById(musicId).lean();
  if (!musicById) {
    return null;
  }

  return musicById;
};
