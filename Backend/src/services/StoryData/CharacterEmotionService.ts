import createHttpError from "http-errors";
import Character from "../../models/StoryData/Character";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import { validateMongoId } from "../../utils/validateMongoId";

type GetCharacterEmotionByCharacterIdTypes = {
  characterId: string;
};

export const characterEmotionGetByCharacterIdService = async ({
  characterId,
}: GetCharacterEmotionByCharacterIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacters = await Character.find({ characterId }).lean();
  if (!existingCharacters) {
    throw [];
  }

  return existingCharacters;
};

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

type UpdateCharacterEmotionTypes = {
  emotionName: string | undefined;
  characterEmotionId: string;
};

export const characterEmotionUpdateService = async ({
  characterEmotionId,
  emotionName,
}: UpdateCharacterEmotionTypes) => {
  validateMongoId({ value: characterEmotionId, valueName: "CharacterEmotion" });

  const existingCharacterEmotion = await CharacterEmotion.findById(
    characterEmotionId
  ).exec();
  if (!existingCharacterEmotion) {
    throw createHttpError(400, "CharacterEmotion with such id wasn't found");
  }

  if (!emotionName?.trim().length) {
    throw createHttpError(400, "Emotion is required");
  }

  existingCharacterEmotion.emotionName = emotionName;

  return await existingCharacterEmotion.save();
};
type DeleteCharacterEmotionTypes = {
  characterEmotionId: string;
};

export const characterEmotionDeleteService = async ({
  characterEmotionId,
}: DeleteCharacterEmotionTypes) => {
  validateMongoId({ value: characterEmotionId, valueName: "CharacterEmotion" });

  const existingCharacterEmotion = await CharacterEmotion.findById(
    characterEmotionId
  ).exec();
  if (!existingCharacterEmotion) {
    throw createHttpError(400, "CharacterEmotion with such id wasn't found");
  }

  return await existingCharacterEmotion.deleteOne();
};
