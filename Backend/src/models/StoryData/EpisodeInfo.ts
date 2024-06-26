import mongoose, { InferSchemaType, model } from "mongoose";

// episodeStatus = "done" | "doing"

export const episodeInfoSchema = new mongoose.Schema({
  episodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode",
    required: true,
  },
  episodeStatus: {
    type: String,
    default: "doing",
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
});

type EpisodeInfo = InferSchemaType<typeof episodeInfoSchema>;

export default model<EpisodeInfo>("EpisodeInfo", episodeInfoSchema);
