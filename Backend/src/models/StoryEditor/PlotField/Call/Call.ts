import mongoose, { InferSchemaType, model } from "mongoose";

export const callSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  targetBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  referencedCommandIndex: {
    type: Number,
    default: 0,
  },
});

type Call = InferSchemaType<typeof callSchema>;

export default model<Call>("Call", callSchema);
