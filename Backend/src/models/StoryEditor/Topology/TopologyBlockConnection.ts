import mongoose, { InferSchemaType, model } from "mongoose";

export const topologyConnectionSchema = new mongoose.Schema({
  episodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode",
  },
  sourceBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
  targetBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
});

type TopologyConnection = InferSchemaType<typeof topologyConnectionSchema>;

export default model<TopologyConnection>(
  "TopologyConnection",
  topologyConnectionSchema
);
