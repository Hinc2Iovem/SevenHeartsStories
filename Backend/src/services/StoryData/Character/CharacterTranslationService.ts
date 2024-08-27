import createHttpError from "http-errors";
import { CharacterTypes } from "../../../consts/CHARACTER_TYPES";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Character from "../../../models/StoryData/Character";
import TranslationCharacter from "../../../models/StoryData/Translation/TranslationCharacter";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

export const getCharacterTranslationUpdatedAtAndLanguageService = async ({
  currentLanguage,
  updatedAt,
}: GetByUpdatedAtAndLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  let startDate: Date | undefined;
  let endDate = new Date();

  switch (updatedAt) {
    case "30min":
      startDate = subMinutes(endDate, 30);
      break;
    case "1hr":
      startDate = subHours(endDate, 1);
      break;
    case "5hr":
      startDate = subHours(endDate, 5);
      break;
    case "1d":
      startDate = subDays(endDate, 1);
      break;
    case "3d":
      startDate = subDays(endDate, 3);
      break;
    case "7d":
      startDate = subDays(endDate, 7);
      break;
    default:
      throw createHttpError(400, "Invalid updatedAt value");
  }

  const existingTranslations = await TranslationCharacter.find({
    updatedAt: { $gte: startDate, $lt: endDate },
    language: currentLanguage,
  })
    .lean()
    .exec();

  if (!existingTranslations.length) {
    return [];
  }
  return existingTranslations;
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

type GetCharacterTranslationByCharacterIdTypes = {
  characterId: string;
  currentLanguage?: string;
};

export const getCharacterTranslationByCharacterIdService = async ({
  characterId,
  currentLanguage,
}: GetCharacterTranslationByCharacterIdTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await TranslationCharacter.findOne({
    characterId,
    language: currentLanguage,
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
  type: string | undefined;
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
  type: string | undefined;
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
