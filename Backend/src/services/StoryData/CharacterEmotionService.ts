import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import Character from "../../models/StoryData/Character";

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

  if (!emotionName) {
    throw createHttpError(400, "Emotion is required");
  }

  return await CharacterEmotion.create({ characterId, emotionName });
};
