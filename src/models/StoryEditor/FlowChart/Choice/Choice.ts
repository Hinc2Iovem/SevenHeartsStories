import mongoose, { InferSchemaType, model } from "mongoose";

// choiceType = multiple | common | timelimit

export const flowchartCommandChoiceSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  choiceType: {
    type: String,
    default: "common",
  },
  timeLimit: {
    type: Number,
  },
});

type FlowchartCommandChoice = InferSchemaType<
  typeof flowchartCommandChoiceSchema
>;

export default model<FlowchartCommandChoice>(
  "FlowchartCommandChoice",
  flowchartCommandChoiceSchema
);
