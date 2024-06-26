import mongoose, { InferSchemaType, model } from "mongoose";

// choiceType = multiple | common | timelimit

export const plotFieldCommandChoiceSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  choiceType: {
    type: String,
    default: "common",
  },
  exitBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  timeLimit: {
    type: Number,
  },
});

type PlotFieldCommandChoice = InferSchemaType<
  typeof plotFieldCommandChoiceSchema
>;

export default model<PlotFieldCommandChoice>(
  "PlotFieldCommandChoice",
  plotFieldCommandChoiceSchema
);
