export type PlotFieldTypes = {
  _id: string;
  topologyBlockId: string;
  command: AllPossiblePlotFieldComamndsTypes;
  commandOrder: number;
};

export type AllPossiblePlotFieldComamndsTypes =
  | "achievement"
  | "ambient"
  | "background"
  | "call"
  | "choice"
  | "if"
  | "condition"
  | "cutscene"
  | "effect"
  | "getitem"
  | "key"
  | "move"
  | "music"
  | "name"
  | "author"
  | "sound"
  | "suit"
  | "wait"
  | "wardrobe";
