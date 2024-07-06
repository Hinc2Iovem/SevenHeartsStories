export type TopologyBlockTypes = {
  _id: string;
  coordinatesX: number;
  coordinatesY: number;
  isStartingTopologyBlock: boolean;
  episodeId: string;
  name?: string;
};

export type TopologyBlockInfoTypes = {
  _id: string;
  topologyBlockId: string;
  amountOfAchievements: number;
  amountOfWords: number;
  amountOfCharacterWords: number;
  amountOfAuthorWords: number;
  amountOfAmethysts: number;
};

export type TopologyBlockConnectionTypes = {
  _id: string;
  sourceBlockId: string;
  targetBlockId: string;
};
