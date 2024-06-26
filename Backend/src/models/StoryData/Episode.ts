import mongoose, { InferSchemaType, model } from "mongoose";

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
});

type Episode = InferSchemaType<typeof episodeSchema>;

export default model<Episode>("Episode", episodeSchema);
