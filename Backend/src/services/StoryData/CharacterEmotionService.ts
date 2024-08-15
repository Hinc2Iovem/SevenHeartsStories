import createHttpError from "http-errors";
import Character from "../../models/StoryData/Character";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import { validateMongoId } from "../../utils/validateMongoId";

type GetCharacterEmotionByypes = {
  characterEmotionId: string;
};

export const characterEmotionGetByIdService = async ({
  characterEmotionId,
}: GetCharacterEmotionByypes) => {
  validateMongoId({ value: characterEmotionId, valueName: "CharacterEmotion" });

  const existingCharacterEmotions = await CharacterEmotion.findById(
    characterEmotionId
  ).lean();
  if (!existingCharacterEmotions) {
    throw null;
  }

  return existingCharacterEmotions;
};
type GetCharacterEmotionByCharacterIdTypes = {
  characterId: string;
};

export const characterEmotionGetByCharacterIdService = async ({
  characterId,
}: GetCharacterEmotionByCharacterIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacterEmotions = await CharacterEmotion.find({
    characterId,
  }).lean();
  if (!existingCharacterEmotions.length) {
    throw [];
  }

  return existingCharacterEmotions;
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

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id wasn't found");
  }

  if (!emotionName?.trim().length) {
    throw createHttpError(400, "Emotion is required");
  }

  existingCharacter.emotions.push({
    emotionName,
  });

  return await existingCharacter.save();
};

type UpdateCharacterEmotionTypes = {
  emotionName: string | undefined;
  characterId: string;
};

export const characterEmotionUpdateService = async ({
  characterId,
  emotionName,
}: UpdateCharacterEmotionTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id wasn't found");
  }

  if (!emotionName?.trim().length) {
    throw createHttpError(400, "Emotion is required");
  }

  const currentEmotion = existingCharacter.emotions.find(
    (e) => (e.emotionName || "").toLowerCase() === emotionName.toLowerCase()
  );

  if (currentEmotion) {
    currentEmotion.emotionName = emotionName;
  }

  return await existingCharacter.save();
};

type UpdateCharacterEmotionImgTypes = {
  imgUrl: string | undefined;
  characterId: string;
  emotionName: string | undefined;
};

export const characterEmotionUpdateImgService = async ({
  characterId,
  imgUrl,
  emotionName,
}: UpdateCharacterEmotionImgTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id wasn't found");
  }

  if (!imgUrl?.trim().length) {
    throw createHttpError(400, "imgUrl is required");
  }

  const currentEmotion = existingCharacter.emotions.find(
    (e) =>
      (e.emotionName || "").toLowerCase() === (emotionName || "").toLowerCase()
  );

  if (currentEmotion) {
    currentEmotion.imgUrl = imgUrl;
  }

  return await existingCharacter.save();
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
