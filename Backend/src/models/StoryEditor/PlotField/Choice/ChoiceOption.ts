import mongoose, { InferSchemaType, model } from "mongoose";

// type = Premium | Relationship | Requirement | Characteristic | Common

export const plotFieldCommandChoiceOptionSchema = new mongoose.Schema({
  plotFieldCommandChoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommandChoice",
  },
  topologyBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  type: {
    type: String,
    default: "common",
  },
});

type PlotFieldCommandChoiceOption = InferSchemaType<
  typeof plotFieldCommandChoiceOptionSchema
>;

export default model<PlotFieldCommandChoiceOption>(
  "PlotFieldCommandChoiceOption",
  plotFieldCommandChoiceOptionSchema
);
