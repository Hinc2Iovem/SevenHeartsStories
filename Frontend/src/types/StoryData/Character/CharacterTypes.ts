export type CharacterTypes =
  | "emptycharacter"
  | "minorcharacter"
  | "maincharacter";

export type CharacterGetTypes = {
  _id: string;
  storyId: string;
  type: CharacterTypes;
  isMainCharacter: boolean;
  nameTag?: string;
  img?: string;
};
