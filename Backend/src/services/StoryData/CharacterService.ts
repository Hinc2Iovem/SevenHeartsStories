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
  isMainCharacter: boolean | undefined;
};

export const characterCreateService = async ({
  description,
  isMainCharacter,
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
    return await Character.create({
      description,
      name,
      img: img ?? "",
      storyId,
      type,
      unknownName: unknownName ?? "",
    });
  } else {
    return await Character.create({
      description,
      name,
      isMainCharacter: isMainCharacter ?? false,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
      type,
      unknownName: unknownName ?? "",
    });
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
};

export const characterUpdateService = async ({
  description,
  img,
  name,
  nameTag,
  type,
  unknownName,
  characterId,
}: UpdateCharacterTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  if (name?.trim().length) {
    existingCharacter.name = name;
    const existingTranslation = await Translation.findOne({
      textFieldName: TranslationTextFieldName.CharacterName,
      characterId,
      language: existingCharacter.currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = name;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: name,
        language: existingCharacter.currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterName,
      });
    }
  }
  if (description?.trim().length) {
    existingCharacter.description = description;
    const existingTranslation = await Translation.findOne({
      textFieldName: TranslationTextFieldName.CharacterDescription,
      characterId,
      language: existingCharacter.currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = description;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: description,
        language: existingCharacter.currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterDescription,
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
    existingCharacter.unknownName = unknownName;
    const existingTranslation = await Translation.findOne({
      textFieldName: TranslationTextFieldName.CharacterUnknownName,
      characterId,
      language: existingCharacter.currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = unknownName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: unknownName,
        language: existingCharacter.currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterUnknownName,
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
