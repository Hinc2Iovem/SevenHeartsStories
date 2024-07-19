import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionValueSchema = new mongoose.Schema({
  conditionBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConditionBlock",
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
