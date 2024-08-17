import createHttpError from "http-errors";
import {
  CharacterTypes,
  CharacterTypesWithAll,
} from "../../consts/CHARACTER_TYPES";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import {
  AllPossibleCharacterTypes,
  CharacterTypeAlias,
} from "../../controllers/StoryData/CharacterController";
import Character from "../../models/StoryData/Character";
import CharacterEmotion from "../../models/StoryData/CharacterEmotion";
import Translation from "../../models/StoryData/Translation/Translation";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../utils/validateMongoId";
import TranslationCharacter from "../../models/StoryData/Translation/TranslationCharacter";

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

type GetAllTranslationCharactersByStoryIdTypes = {
  storyId: string;
  currentLanguage?: string;
};

export const getAllTranslationCharactersByStoryIdService = async ({
  storyId,
  currentLanguage,
}: GetAllTranslationCharactersByStoryIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });

  const existingCharacters = await TranslationCharacter.find({
    storyId,
    language: currentLanguage,
  }).exec();

  if (!existingCharacters.length) {
    return [];
  }

  return existingCharacters;
};
type GetCharactersByStoryAndSearchId = {
  storyId?: string;
  text?: string;
  currentLanguage?: string;
  characterType?: string;
};

export const characterGetAllByLanguageAndStoryIdSearchService = async ({
  storyId,
  text,
  currentLanguage,
  characterType,
}: GetCharactersByStoryAndSearchId) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }

  const query: { storyId?: string; language: string; characterType?: string } =
    {
      language: currentLanguage,
    };

  if (storyId) {
    console.log(storyId);

    validateMongoId({ value: storyId, valueName: "Story" });
    query.storyId = storyId;
  }
  if (characterType) {
    if (!CharacterTypes.includes(characterType.toLowerCase())) {
      throw createHttpError(
        400,
        `Such characterType isn't supported, possible variations: ${CharacterTypes.map(
          (c) => c
        )}`
      );
    }
    query.characterType = characterType.toLowerCase();
  }

  const existingCharacters = await TranslationCharacter.find(query).exec();

  if (!existingCharacters.length) {
    return [];
  }

  const filteredCharacters = text?.trim().length
    ? existingCharacters.filter((ec) =>
        ec.translations[0].text?.toLowerCase()?.includes(text.toLowerCase())
      )
    : existingCharacters;

  return filteredCharacters;
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

type GetCharacterTranslationByCharacterIdTypes = {
  characterId: string;
};

export const getCharacterTranslationByCharacterIdService = async ({
  characterId,
}: GetCharacterTranslationByCharacterIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await TranslationCharacter.findOne({
    characterId,
  }).lean();
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

  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }
  if (!CharacterTypes.includes(type?.toLowerCase())) {
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

    const translations = {
      textFieldName: TranslationTextFieldName.CharacterName,
      text: name,
    };
    await TranslationCharacter.create({
      characterId: character._id,
      language: currentLanguage,
      characterType: "emptycharacter",
      translations: [translations],
      storyId,
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
    const translations = [
      {
        textFieldName: TranslationTextFieldName.CharacterName,
        text: name,
      },
      {
        textFieldName: TranslationTextFieldName.CharacterUnknownName,
        text: unknownName,
      },
      {
        textFieldName: TranslationTextFieldName.CharacterDescription,
        text: description,
      },
    ];
    await TranslationCharacter.create({
      characterId: character._id,
      language: currentLanguage,
      characterType: "minorcharacter",
      translations: translations,
      storyId,
    });

    return character;
  } else if (type && type.toLowerCase() === "maincharacter") {
    const existingMainCharacter = await Character.findOne({
      storyId,
      isMainCharacter: true,
    });
    if (existingMainCharacter) {
      throw createHttpError(400, "Main Character already exists");
    }
    const character = await Character.create({
      name,
      isMainCharacter: true,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
      type: type.toLowerCase(),
    });
    const translations = {
      textFieldName: TranslationTextFieldName.CharacterName,
      text: name,
    };
    await TranslationCharacter.create({
      characterId: character._id,
      language: currentLanguage,
      characterType: "maincharacter",
      translations: [translations],
      storyId,
    });

    return character;
  } else {
    const character = await Character.create({
      name,
      nameTag: nameTag ?? "",
      img: img ?? "",
      storyId,
    });
    const translations = {
      textFieldName: TranslationTextFieldName.CharacterName,
      text: name,
    };
    await TranslationCharacter.create({
      characterId: character._id,
      language: currentLanguage,
      characterType: "emptycharacter",
      translations: [translations],
      storyId,
    });
  }
};

type CharacterCreateBlankTypes = {
  storyId: string;
  name: string | undefined;
  type: CharacterTypeAlias | undefined;
  currentLanguage: string | undefined;
};

export const characterCreateBlankService = async ({
  currentLanguage,
  name,
  storyId,
  type,
}: CharacterCreateBlankTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!name?.trim().length) {
    throw createHttpError(400, "Name is required");
  }
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });
  if (!type?.trim().length) {
    throw createHttpError(400, "Type is required");
  }

  if (!CharacterTypes.includes(type?.toLowerCase())) {
    throw createHttpError(
      400,
      "Character Type may be equal only to (maincharacter, minorcharacter or emptycharacter)"
    );
  }

  const character = await Character.create({
    name,
    storyId,
    type: type.toLowerCase(),
  });
  const translations = [
    {
      textFieldName: TranslationTextFieldName.CharacterName,
      text: name,
    },
  ];
  await TranslationCharacter.create({
    characterId: character._id,
    language: currentLanguage,
    characterType: "minorcharacter",
    translations: translations,
    storyId,
  });
  return character;
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

type UpdateCharacterTranslationTypes = {
  characterId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage: string | undefined;
};

export const characterUpdateTranslationService = async ({
  text,
  textFieldName,
  characterId,
  currentLanguage,
}: UpdateCharacterTranslationTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).lean();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }

  const existingCharacterTranslation = await TranslationCharacter.findOne({
    characterId,
    language: currentLanguage,
  }).exec();

  if (existingCharacterTranslation) {
    const currentTranslationField =
      existingCharacterTranslation.translations.find(
        (t) => t.textFieldName === textFieldName
      );
    if (currentTranslationField) {
      currentTranslationField.text = text;
    } else {
      existingCharacterTranslation.translations.push({
        text,
        textFieldName,
      });
    }
    return await existingCharacterTranslation.save();
  } else {
    return await TranslationCharacter.create({
      characterId,
      characterType: existingCharacter.type,
      storyId: existingCharacter.storyId,
      language: currentLanguage,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
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
