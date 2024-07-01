import mongoose, { InferSchemaType, model } from "mongoose";

// sexualOrientationType = "hetero" | "lgbt" | "combined"

export const topologyBlockSchema = new mongoose.Schema({
  episodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode",
  },
  isStartingTopologyBlock: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  coordinatesX: {
    type: Number,
    default: 50,
  },
  sexualOrientationType: {
    type: String,
  },
  coordinatesY: {
    type: Number,
    default: 50,
  },
});

type TopologyBlock = InferSchemaType<typeof topologyBlockSchema>;

export default model<TopologyBlock>("TopologyBlock", topologyBlockSchema);
