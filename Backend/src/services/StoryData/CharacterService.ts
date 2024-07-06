import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import { CharacterTypeAlias } from "../../controllers/StoryData/CharacterController";
import Character from "../../models/StoryData/Character";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import Translation from "../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { CharacterTypes } from "../../consts/CHARACTER_TYPES";

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

type GetCharactersByStoryIdAndNameTypes = {
  storyId: string;
  name: string | undefined;
};

export const characterGetByStoryIdAndNameService = async ({
  storyId,
  name,
}: GetCharactersByStoryIdAndNameTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!name?.trim().length) {
    throw createHttpError(400, "Name is required");
  }

  const existingCharacter = await Translation.findOne({
    textFieldName: TranslationTextFieldName.CharacterName,
    text: name,
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (!existingCharacter) {
    return null;
  }

  return existingCharacter;
};

type CharacterCreateTypes = {
  storyId: string;
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
  currentLanguage: string | undefined;
};

export const characterCreateService = async ({
  description,
  currentLanguage,
  img,
  name,
  nameTag,
  storyId,
  type,
  unknownName,
}: CharacterCreateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!name?.trim().length) {
    throw createHttpError(400, "Name is required");
  }
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });
  if (type?.trim().length && !CharacterTypes.includes(type?.toLowerCase())) {
    throw createHttpError(
      400,
      "Character Type may be equal only to (maincharacter, minorcharacter or emptycharacter)"
    );
  }

  if (type && type.toLowerCase() === "emptycharacter") {
    const character = await Character.create({
      name,
      img: img ?? "",
      storyId,
      type: type.toLowerCase(),
    });

    await Translation.create({
      characterId: character._id,
      textFieldName: TranslationTextFieldName.CharacterName,
      language: currentLanguage,
      text: name,
    });

    return character;
  } else if (type && type.toLowerCase() === "minorcharacter") {
    if (!description?.trim().length) {
      throw createHttpError(400, "Description is required");
    }
    const character = await Character.create({
      description,
      name,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
      type: type.toLowerCase(),
      unknownName: unknownName ?? "",
    });
    await Translation.create({
      characterId: character._id,
      textFieldName: TranslationTextFieldName.CharacterName,
      language: currentLanguage,
      text: name,
    });
    await Translation.create({
      characterId: character._id,
      textFieldName: TranslationTextFieldName.CharacterUnknownName,
      language: currentLanguage,
      text: unknownName,
    });
    await Translation.create({
      characterId: character._id,
      textFieldName: TranslationTextFieldName.CharacterDescription,
      language: currentLanguage,
      text: description,
    });
    return character;
  } else if (type && type.toLowerCase() === "maincharacter") {
    const character = await Character.create({
      name,
      isMainCharacter: true,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
      type: type.toLowerCase(),
    });
    await Translation.create({
      characterId: character._id,
      textFieldName: TranslationTextFieldName.CharacterName,
      language: currentLanguage,
      text: name,
    });

    return character;
  } else {
    const character = await Character.create({
      name,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
    });
    await Translation.create({
      characterId: character._id,
      textFieldName: TranslationTextFieldName.CharacterName,
      language: currentLanguage,
      text: name,
    });
  }
};

type UpdateCharacterTypes = {
  characterId: string;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
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
