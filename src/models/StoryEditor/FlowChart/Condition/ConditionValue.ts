import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionValueSchema = new mongoose.Schema({
  flowchartCommandConditionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandCondition",
  },
  flowchartCommandConditionCombinedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandConditionCombined",
  },
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
  sign: {
    type: String,
  },
});

type ConditionValue = InferSchemaType<typeof conditionValueSchema>;

export default model<ConditionValue>("ConditionValue", conditionValueSchema);
