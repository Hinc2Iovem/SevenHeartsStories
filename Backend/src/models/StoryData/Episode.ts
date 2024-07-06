import mongoose, { InferSchemaType, model } from "mongoose";

// Translation ("episodeName",
// "episodeDescription"),

// episodeStatus = "done" | "doing"

export const episodeSchema = new mongoose.Schema({
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
  episodeOrder: {
    type: Number,
    default: 1,
  },
  episodeStatus: {
    type: String,
    default: "doing",
  },
});

type Episode = InferSchemaType<typeof episodeSchema>;

export default model<Episode>("Episode", episodeSchema);
