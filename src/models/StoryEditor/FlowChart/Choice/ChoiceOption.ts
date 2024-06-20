import mongoose, { InferSchemaType, model } from "mongoose";

// type = Premium | Relationship | Requirement | Characteristic | Common

export const flowchartCommandChoiceOptionSchema = new mongoose.Schema({
  flowchartCommandChoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommandChoice",
  },
  topologyBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  type: {
    type: String,
    default: "common",
  },
});

type FlowchartCommandChoiceOption = InferSchemaType<
  typeof flowchartCommandChoiceOptionSchema
>;

export default model<FlowchartCommandChoiceOption>(
  "FlowchartCommandChoiceOption",
  flowchartCommandChoiceOptionSchema
);
