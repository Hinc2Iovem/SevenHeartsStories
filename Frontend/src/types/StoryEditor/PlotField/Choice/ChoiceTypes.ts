import { SexualOrientationTypes } from "./SEXUAL_ORIENTATION_TYPES";

export const ChoiceOptionVariations: ChoiceOptionVariationsTypes[] = [
  "characteristic",
  "common",
  "premium",
  "relationship",
];

export type ChoiceOptionVariationsTypes =
  | "premium"
  | "common"
  | "characteristic"
  | "relationship";

export const ChoiceVariations: ChoiceVariationsTypes[] = [
  "common",
  "timelimit",
  "multiple",
];

export type ChoiceVariationsTypes = "common" | "multiple" | "timelimit";

export type ChoiceTypes = {
  _id: string;
  plotFieldCommandId: string;
  choiceType: ChoiceVariationsTypes;
  exitBlockId?: string;
  isAuthor: boolean;
  characterId?: string;
  characterEmotionId?: string;
  timeLimit?: number;
};

export type ChoiceOptionTypes = {
  _id: string;
  plotFieldCommandChoiceId: string;
  topologyBlock: string;
  sexualOrientationType: SexualOrientationTypes;
};

export type OptionPremiumTypes = {
  _id: string;
  plotFieldCommandChoiceOptionId: string;
  priceAmethysts: number;
};

export type OptionCharacteristicTypes = {
  _id: string;
  plotFieldCommandChoiceOptionId: string;
  amountOfPoints: number;
  characterCharacteristicId: string;
};

export type OptionRelationshipTypes = {
  _id: string;
  plotFieldCommandChoiceOptionId: string;
  amountOfPoints: number;
  characterId: string;
};
