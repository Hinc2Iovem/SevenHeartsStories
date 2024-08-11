import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import CharacterCharacteristic from "../../models/StoryData/CharacterCharacteristic";
import Translation from "../../models/StoryData/Translation";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../utils/validateMongoId";

type CharacterCharacteristicGetByIdTypes = {
  characterCharacteristicId: string;
};

export const characterCharacteristicGetByIdService = async ({
  characterCharacteristicId,
}: CharacterCharacteristicGetByIdTypes) => {
  validateMongoId({
    value: characterCharacteristicId,
    valueName: "CharacterCharacteristic",
  });

  const existingCharacteristics = await CharacterCharacteristic.findById(
    characterCharacteristicId
  ).lean();
  if (!existingCharacteristics) {
    return null;
  }

  return existingCharacteristics;
};
type CharacterCharacteristicGetByStoryIdTypes = {
  storyId: string;
};

export const getAllCharacterCharacteristicsByStoryIdService = async ({
  storyId,
}: CharacterCharacteristicGetByStoryIdTypes) => {
  const existingCharacteristics = await CharacterCharacteristic.find({
    storyId,
  }).lean();
  if (!existingCharacteristics.length) {
    return [];
  }

  return existingCharacteristics;
};
export const getAllCharacterCharacteristicsService = async () => {
  const existingCharacteristics = await CharacterCharacteristic.find().lean();
  if (!existingCharacteristics.length) {
    return [];
  }

  return existingCharacteristics;
};

type CharacterCharacteristicCreateTypes = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

export const characterCharacteristicCreateService = async ({
  characteristicName,
  currentLanguage,
}: CharacterCharacteristicCreateTypes) => {
  if (!currentLanguage?.trim().length || !characteristicName?.trim().length) {
    throw createHttpError(
      400,
      "currentLanguage and characteristicName is required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const newCharacteristic = await CharacterCharacteristic.create({});

  await Translation.create({
    characterCharacteristicId: newCharacteristic._id,
    language: currentLanguage,
    text: characteristicName,
    textFieldName: TranslationTextFieldName.CharacterCharacteristic,
  });

  return newCharacteristic;
};

type DeleteCharacteristicTypes = {
  characterCharacteristicId: string | undefined;
};

export const characterCharacteristicDeleteService = async ({
  characterCharacteristicId,
}: DeleteCharacteristicTypes) => {
  validateMongoId({
    value: characterCharacteristicId,
    valueName: "Characteristic",
  });

  const existingCharacteristic = await CharacterCharacteristic.findById(
    characterCharacteristicId
  ).exec();
  if (!existingCharacteristic) {
    throw createHttpError(400, "Characteristic with such id doesn't exist");
  }

  await existingCharacteristic.deleteOne();

  return `Character with id ${characterCharacteristicId} was removed`;
};
