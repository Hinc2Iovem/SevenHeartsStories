import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionBlockSchema = new mongoose.Schema({
  conditionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Condition",
  },
  targetBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  isElse: {
    type: Boolean,
    default: false,
  },
  orderOfExecution: {
    type: Number,
  },
});

type ConditionBlock = InferSchemaType<typeof conditionBlockSchema>;

export default model<ConditionBlock>("ConditionBlock", conditionBlockSchema);
