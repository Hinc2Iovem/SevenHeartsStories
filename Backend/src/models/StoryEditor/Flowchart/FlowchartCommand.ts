import mongoose, { InferSchemaType, model } from "mongoose";

// commandSide = "right" | "left"

export const flowchartCommandSchema = new mongoose.Schema({
  topologyBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  command: {
    type: String,
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
