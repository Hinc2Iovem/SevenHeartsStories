import createHttpError from "http-errors";
import Character from "../../models/StoryData/Character";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import { validateMongoId } from "../../utils/validateMongoId";

type CreateCharacterEmotionTypes = {
  emotionName: string | undefined;
  characterId: string;
};

export const characterEmotionCreateService = async ({
  characterId,
  emotionName,
}: CreateCharacterEmotionTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).lean();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id wasn't found");
  }

  if (!emotionName?.trim().length) {
    throw createHttpError(400, "Emotion is required");
  }

  const newEmotion = await CharacterEmotion.create({
    characterId,
    emotionName,
  });

  return newEmotion;
};
