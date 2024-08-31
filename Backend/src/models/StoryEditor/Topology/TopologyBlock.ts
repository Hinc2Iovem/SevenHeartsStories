import mongoose, { InferSchemaType, model } from "mongoose";

export const topologyBlockSchema = new mongoose.Schema(
  {
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
    coordinatesY: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

topologyBlockSchema.index({ createdAt: -1 });

type TopologyBlock = InferSchemaType<typeof topologyBlockSchema>;

export default model<TopologyBlock>("TopologyBlock", topologyBlockSchema);
