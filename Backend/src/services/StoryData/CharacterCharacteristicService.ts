import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import CharacterCharacteristic from "../../models/StoryData/CharacterCharacteristic";
import Translation from "../../models/StoryData/Translation";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../utils/validateMongoId";

type CharacterCharacteristicGetByCharacterIdTypes = {
  characterId: string;
};

export const characterCharacteristicGetByCharacterIdService = async ({
  characterId,
}: CharacterCharacteristicGetByCharacterIdTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacteristics = await CharacterCharacteristic.find({
    characterId,
  }).lean();
  if (!existingCharacteristics.length) {
    return [];
  }

  return existingCharacteristics;
};

type CharacterCharacteristicCreateTypes = {
  characterId: string;
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

export const characterCharacteristicCreateService = async ({
  characterId,
  characteristicName,
  currentLanguage,
}: CharacterCharacteristicCreateTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });
  if (!currentLanguage?.trim().length || !characteristicName?.trim().length) {
    throw createHttpError(
      400,
      "currentLanguage and characteristicName is required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const newCharacteristic = await CharacterCharacteristic.create({
    characterId,
  });

  await Translation.create({
    characterCharacteristicId: newCharacteristic._id,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.CharacterCharacteristic,
  });

  return newCharacteristic;
};

type UpdateCharacterCharacteristicTypes = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
  characteristicId: string;
};

export const characterCharacteristicUpdateService = async ({
  currentLanguage,
  characteristicId,
  characteristicName,
}: UpdateCharacterCharacteristicTypes) => {
  validateMongoId({ value: characteristicId, valueName: "Characteristic" });

  const existingCharacteristic = await CharacterCharacteristic.findById(
    characteristicId
  ).exec();
  if (!existingCharacteristic) {
    throw createHttpError(400, "Characteristic with such id doesn't exist");
  }

  if (characteristicName?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterCharacteristicId: characteristicId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterCharacteristic,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = characteristicName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterCharacteristicId: characteristicId,
        text: characteristicName,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterCharacteristic,
      });
    }
  }

  return existingCharacteristic;
};

type DeleteCharacteristicTypes = {
  characteristicId: string | undefined;
};

export const characterCharacteristicDeleteService = async ({
  characteristicId,
}: DeleteCharacteristicTypes) => {
  validateMongoId({ value: characteristicId, valueName: "Characteristic" });

  const existingCharacteristic = await CharacterCharacteristic.findById(
    characteristicId
  ).exec();
  if (!existingCharacteristic) {
    throw createHttpError(400, "Characteristic with such id doesn't exist");
  }

  await existingCharacteristic.deleteOne();

  return `Character with id ${characteristicId} was removed`;
};
