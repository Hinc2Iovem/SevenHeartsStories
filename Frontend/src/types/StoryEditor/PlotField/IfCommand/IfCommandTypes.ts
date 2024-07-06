import { ConditionSignTypes } from "../Condition/ConditionTypes";

export type IfCommandTypes = {
  _id: string;
  isElse: boolean;
  plotFieldCommandId: string;
};

export type IfValueTypes = {
  _id: string;
  plotFieldCommandIfId: string;
  name: string;
  value: number;
  sign: ConditionSignTypes;
};
