import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionCombinedSchema = new mongoose.Schema({
  plotFieldCommandConditionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandCondition",
  },
  logicalOperator: {
    type: String,
  },
});

type ConditionCombined = InferSchemaType<typeof conditionCombinedSchema>;

export default model<ConditionCombined>(
  "ConditionCombined",
  conditionCombinedSchema
);
