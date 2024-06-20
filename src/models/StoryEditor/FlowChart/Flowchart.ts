import mongoose, { InferSchemaType, model } from "mongoose";

export const flowchartSchema = new mongoose.Schema({
  topologyBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type Flowchart = InferSchemaType<typeof flowchartSchema>;

export default model<Flowchart>("Flowchart", flowchartSchema);
