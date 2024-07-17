import mongoose, { InferSchemaType, model } from "mongoose";

// commandSide = "right" | "left"

export const plotFieldCommandSchema = new mongoose.Schema({
  topologyBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  commandIfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IfModel",
  },
  isElse: {
    type: Boolean,
    default: false,
  },
  command: {
    type: String,
  },
  commandOrder: {
    type: Number,
  },
});

type PlotFieldCommand = InferSchemaType<typeof plotFieldCommandSchema>;

export default model<PlotFieldCommand>(
  "PlotFieldCommand",
  plotFieldCommandSchema
);
