export type ConditionTypes = {
  _id: string;
  plotFieldCommandId: string;
  targetBlockId: string;
  isElse: boolean;
};

export type ConditionSignTypes = ">" | "<" | "=" | ">=" | "<=";

export type ConditionValueTypes = {
  plotFieldCommandConditionId: string;
  name: string;
  value: number;
  sign: ConditionSignTypes;
};
