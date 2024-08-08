import { CurrentlyAvailableLanguagesTypes } from "./CURRENTLY_AVAILABEL_LANGUAGES";
import {
  TranslationTextFieldNameAppearancePartsTypes,
  TranslationTextFieldNameCharacterCharacteristicTypes,
  TranslationTextFieldNameCharacterTypes,
  TranslationTextFieldNameChoiceOptionTypes,
  TranslationTextFieldNameCommandTypes,
  TranslationTextFieldNameEpisodeTypes,
  TranslationTextFieldNameSeasonTypes,
  TranslationTextFieldNameStoryTypes,
} from "./TRANSLATION_TEXT_FIELD_NAMES";

export type AllTranslationTextFieldNamesTypes =
  | TranslationTextFieldNameAppearancePartsTypes
  | TranslationTextFieldNameCharacterCharacteristicTypes
  | TranslationTextFieldNameCharacterTypes
  | TranslationTextFieldNameChoiceOptionTypes
  | TranslationTextFieldNameCommandTypes
  | TranslationTextFieldNameEpisodeTypes
  | TranslationTextFieldNameSeasonTypes
  | TranslationTextFieldNameStoryTypes;

export type GetTranslationTypes = {
  path: string;
  id: string;
  language?: CurrentlyAvailableLanguagesTypes;
};

export type TranslationCommandTypes = {
  _id: string;
  commandId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameCommandTypes;
};

export type TranslationAppearancePartTypes = {
  _id: string;
  appearancePartId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameAppearancePartsTypes;
};

export type TranslationCharacterTypes = {
  _id: string;
  characterId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameCharacterTypes;
};

export type TranslationEpisodeTypes = {
  _id: string;
  episodeId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameEpisodeTypes;
};

export type TranslationSeasonTypes = {
  _id: string;
  seasonId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameSeasonTypes;
};

export type TranslationStoryTypes = {
  _id: string;
  storyId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameStoryTypes;
};

export type TranslationChoiceOptionTypes = {
  _id: string;
  choiceOptionId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameChoiceOptionTypes;
};

export type TranslationCharacteCharacteristicTypes = {
  _id: string;
  characteCharacteristicId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameCharacterCharacteristicTypes;
};
