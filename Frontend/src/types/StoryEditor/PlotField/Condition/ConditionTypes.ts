export type ConditionTypes = {
  _id: string;
  plotFieldCommandId: string;
};
export type ConditionBlockTypes = {
  _id: string;
  conditionId: string;
  targetBlockId: string;
  isElse: boolean;
};

export type ConditionSignTypes = ">" | "<" | "=" | ">=" | "<=";

export type ConditionValueTypes = {
  conditionBlockId: string;
  name: string;
  value: number;
  sign: ConditionSignTypes;
};
