import mongoose, { InferSchemaType, model } from "mongoose";

export const callSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  targetBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
});

type Call = InferSchemaType<typeof callSchema>;

export default model<Call>("Call", callSchema);
