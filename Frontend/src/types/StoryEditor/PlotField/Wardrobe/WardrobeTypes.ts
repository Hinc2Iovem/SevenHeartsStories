export type CommandWardrobeTypes = {
  _id: string;
  plotFieldCommandId: string;
  isCurrentDressed: boolean;
};

export type CommandWardrobeAppearanceTypeBlockTypes = {
  _id: string;
  appearancePartId: string;
  commandWardrobeId: string;
};
