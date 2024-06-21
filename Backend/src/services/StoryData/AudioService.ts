import createHttpError from "http-errors";
import Audio from "../../models/StoryData/Audio";
import { validateMongoId } from "../../utils/validateMongoId";

type AudioUpdateName = {
  audioName: string | undefined;
  audioId: string;
};

export const audioUpdateNameService = async ({
  audioName,
  audioId,
}: AudioUpdateName) => {
  validateMongoId({ value: audioId, valueName: "audio" });

  const existingAudio = await Audio.findById(audioId).exec();
  if (!existingAudio) {
    throw createHttpError(400, "Such audio doesn't exist");
  }

  if (!audioName?.trim().length) {
    return existingAudio;
  }

  existingAudio.audioName = audioName;

  return await existingAudio.save();
};
