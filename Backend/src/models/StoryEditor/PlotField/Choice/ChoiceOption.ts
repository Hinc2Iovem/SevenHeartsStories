import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "choiceOption"
// type = Premium | Relationship | Characteristic | Common
// sexualOrientationType = "hetero" | "lgbt" | "combined"

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
  sexualOrientationType: {
    type: String,
    default: "combined",
  },
  optionOrder: {
    type: Number,
  },
});

type PlotFieldCommandChoiceOption = InferSchemaType<
  typeof plotFieldCommandChoiceOptionSchema
>;

export default model<PlotFieldCommandChoiceOption>(
  "PlotFieldCommandChoiceOption",
  plotFieldCommandChoiceOptionSchema
);
