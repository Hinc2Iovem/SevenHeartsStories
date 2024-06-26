import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  targetBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  isCombined: {
    type: Boolean,
    default: false,
  },
  isElse: {
    type: Boolean,
    default: false,
  },
});

type Condition = InferSchemaType<typeof conditionSchema>;

export default model<Condition>("Condition", conditionSchema);
