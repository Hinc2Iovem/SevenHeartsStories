import createHttpError from "http-errors";
import { validateMongoId } from "../../utils/validateMongoId";
import { CharacterTypeAlias } from "../../controllers/StoryData/CharacterController";
import Character from "../../models/StoryData/Character";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import Translation from "../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";

type CharacterCreateTypes = {
  storyId: string;
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
  currentLanguage: string | undefined;
  isMainCharacter: boolean | undefined;
};

export const characterCreateService = async ({
  description,
  isMainCharacter,
  currentLanguage,
  img,
  name,
  nameTag,
  storyId,
  type,
  unknownName,
}: CharacterCreateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!name?.trim().length || !description?.trim().length) {
    throw createHttpError(400, "Name and Description is required");
  }

  if (type === "common") {
    const character = await Character.create({
      description,
      name,
      img: img ?? "",
      storyId,
      type,
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
  } else {
    const character = await Character.create({
      description,
      name,
      isMainCharacter: isMainCharacter ?? false,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
      type,
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
  }
};

type UpdateCharacterTypes = {
  characterId: string;
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
  currentLanguage: string | undefined;
};

export const characterUpdateService = async ({
  description,
  img,
  name,
  nameTag,
  type,
  unknownName,
  characterId,
  currentLanguage,
}: UpdateCharacterTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  if (name?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterName,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = name;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: name,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterName,
      });
    }
  }
  if (description?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterDescription,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = description;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: description,
        language: currentLanguage,
        textFieldDescription: TranslationTextFieldName.CharacterDescription,
      });
    }
  }
  if (img?.trim().length) {
    existingCharacter.img = img;
  }
  if (nameTag?.trim().length) {
    existingCharacter.nameTag = nameTag;
  }
  if (type?.trim().length) {
    existingCharacter.type = type;
  }
  if (unknownName?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterUnknownName,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = unknownName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: unknownName,
        language: currentLanguage,
        textFieldUnknownName: TranslationTextFieldName.CharacterUnknownName,
      });
    }
  }

  return await existingCharacter.save();
};

type UpdateCharacterNameTagTypes = {
  nameTag: string | undefined;
  characterId: string;
};

export const characterUpdateNameTagService = async ({
  nameTag,
  characterId,
}: UpdateCharacterNameTagTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  if (nameTag?.trim().length) {
    existingCharacter.nameTag = nameTag;
  }

  return await existingCharacter.save();
};

type UpdateCharacterImgTypes = {
  img: string | undefined;
  characterId: string;
};

export const characterUpdateImgService = async ({
  img,
  characterId,
}: UpdateCharacterImgTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  if (img?.trim().length) {
    existingCharacter.img = img;
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
