import { CharacterTypes } from "../StoryData/Character/CharacterTypes";
import { CurrentlyAvailableLanguagesTypes } from "./CURRENTLY_AVAILABEL_LANGUAGES";
import {
  TranslationTextFieldNameAppearancePartsTypes,
  TranslationTextFieldNameCharacterCharacteristicTypes,
  TranslationTextFieldNameCharacterTypes,
  TranslationTextFieldNameChoiceOptionTypes,
  TranslationTextFieldNameCommandTypes,
  TranslationTextFieldNameEpisodeTypes,
  TranslationTextFieldNameGetItemTypes,
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

type GetItemTranslationsTypes = {
  text: string;
  textFieldName: TranslationTextFieldNameGetItemTypes;
  amountOfWords: number;
};

export type TranslationGetItemTypes = {
  _id: string;
  commandId: string;
  topologyBlockId: string;
  language: CurrentlyAvailableLanguagesTypes;
  translations?: GetItemTranslationsTypes[];
  updatedAt: string;
  createdAt: string;
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

type TranslationCharacterObjectTypes = {
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameCharacterTypes;
};
export type TranslationCharacterTypes = {
  _id: string;
  characterId: string;
  characterType: CharacterTypes;
  language: CurrentlyAvailableLanguagesTypes;
  translations?: TranslationCharacterObjectTypes[];
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

export type TranslationCharacterCharacteristicTypes = {
  _id: string;
  characterCharacteristicId: string;
  language: CurrentlyAvailableLanguagesTypes;
  text: string;
  amountOfWords: number;
  textFieldName: TranslationTextFieldNameCharacterCharacteristicTypes;
};

export type RecentTranslationTypes = {
  _id: string;
  commandId?: string;
  appearancePartId?: string;
  characterId?: string;
  commandLibraryId?: string;
  episodeId?: string;
  seasonId?: string;
  storyId?: string;
  choiceOptionId?: string;
  characterCharacteristicId?: string;
  language: CurrentlyAvailableLanguagesTypes;
  textFieldName: AllTranslationTextFieldNamesTypes;
  text: string;
  amountOfWords: number;
  updatedAt: Date;
  createdAt: Date;
};
