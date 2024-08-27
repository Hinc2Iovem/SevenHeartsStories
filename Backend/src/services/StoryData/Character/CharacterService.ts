import createHttpError from "http-errors";
import {
  CharacterTypes,
  CharacterTypesWithAll,
} from "../../../consts/CHARACTER_TYPES";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { AllPossibleCharacterTypes } from "../../../controllers/StoryData/Character/CharacterController";
import Character from "../../../models/StoryData/Character";
import CharacterEmotion from "../../../models/StoryData/CharacterEmotion";
import { validateMongoId } from "../../../utils/validateMongoId";

type GetSingleCharacterByIdTypes = {
  characterId: string;
};

export const getSingleCharacterByIdService = async ({
  characterId,
}: GetSingleCharacterByIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });
  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    return null;
  }

  return existingCharacter;
};

type GetAllCharacterNameTagsTypes = {
  storyId: string;
};

export const getAllCharacterNameTagsService = async ({
  storyId,
}: GetAllCharacterNameTagsTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  const existingCharacters = await Character.find({ storyId }).exec();
  if (existingCharacters.length) {
    const allNameTags: string[] = [];
    existingCharacters.map((c) => {
      if (c.nameTag) {
        if (!allNameTags.includes(c.nameTag)) {
          allNameTags.push(c.nameTag);
        }
      }
    });
    return allNameTags;
  }
  return [];
};

type GetCharactersByStoryIdAmdType = {
  storyId: string;
  type: AllPossibleCharacterTypes;
};

export const characterGetAllByStoryIdAndTypeService = async ({
  storyId,
  type,
}: GetCharactersByStoryIdAmdType) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  if (!type.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!CharacterTypesWithAll.includes(type.toLowerCase())) {
    throw createHttpError(
      400,
      `Type: ${type} is not supported, possible types are: ${CharacterTypesWithAll.map(
        (c) => c
      )}`
    );
  }
  let existingCharacters;
  if (type === "all") {
    existingCharacters = await Character.find({ storyId }).exec();
  } else {
    existingCharacters = await Character.find({
      storyId,
      type: type.toLowerCase(),
    }).exec();
  }
  if (!existingCharacters.length) {
    return [];
  }
  return existingCharacters;
};

type GetCharactersByStoryId = {
  storyId: string;
};

export const characterGetAllByStoryIdService = async ({
  storyId,
}: GetCharactersByStoryId) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingCharacters = await Character.find({ storyId }).exec();
  if (!existingCharacters.length) {
    return [];
  }
  return existingCharacters;
};

type UpdateCharacterTypes = {
  characterId: string;
  nameTag: string | undefined;
  type: string | undefined;
  img: string | undefined;
};

export const characterUpdateService = async ({
  img,
  nameTag,
  type,
  characterId,
}: UpdateCharacterTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  if (img?.trim().length) {
    existingCharacter.img = img;
  }
  if (nameTag?.trim().length) {
    existingCharacter.nameTag = nameTag;
  }
  if (type?.trim().length) {
    if (!CharacterTypes.includes(type.toLowerCase())) {
      throw createHttpError(
        400,
        "type may only be equal to (maincharacter, minorcharacter or emptycharacter)"
      );
    }
    if (
      existingCharacter.type.toLowerCase() === "maincharacter" &&
      type.toLowerCase() !== "maincharacter"
    ) {
      existingCharacter.isMainCharacter = false;
    } else if (type.toLowerCase() === "maincharacter") {
      existingCharacter.isMainCharacter = true;
    }
    existingCharacter.type = type.toLowerCase();
  }

  return await existingCharacter.save();
};

type UpdateCharacterImgTypes = {
  characterId: string;
  imgUrl: string | undefined;
};

export const characterUpdateImgService = async ({
  imgUrl,
  characterId,
}: UpdateCharacterImgTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  if (!imgUrl?.trim().length) {
    throw createHttpError(400, "Img is required");
  }

  existingCharacter.img = imgUrl;

  return await existingCharacter.save();
};

type DeleteCharacterTypes = {
  characterId: string;
};

export const characterDeleteService = async ({
  characterId,
}: DeleteCharacterTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  const existingCharacterEmotions = await CharacterEmotion.find({
    characterId,
  }).exec();
  for (const c of existingCharacterEmotions) {
    await c.deleteOne();
  }

  await existingCharacter.deleteOne();

  return `Character with id ${characterId} was removed`;
};
