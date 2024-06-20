import mongoose, { InferSchemaType, model } from "mongoose";

// commandSide = "right" | "left"

export const flowchartCommandSchema = new mongoose.Schema({
  flowchartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flowchart",
  },
  command: {
    type: String,
    default: "say",
  },
  commandOrder: {
    type: Number,
  },
  commandSide: {
    type: String,
    default: "right",
  },
});

type FlowchartCommand = InferSchemaType<typeof flowchartCommandSchema>;

export default model<FlowchartCommand>(
  "FlowchartCommand",
  flowchartCommandSchema
);
