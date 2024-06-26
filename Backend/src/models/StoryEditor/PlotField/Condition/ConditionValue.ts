import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionValueSchema = new mongoose.Schema({
  plotFieldCommandConditionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandCondition",
  },
  plotFieldCommandConditionCombinedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandConditionCombined",
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
