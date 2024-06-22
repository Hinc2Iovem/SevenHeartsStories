import mongoose, { InferSchemaType, model } from "mongoose";

export const episodeSchema = new mongoose.Schema({
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  title: {
    type: String,
    required: true,
  },
  episodeNumber: {
    type: Number,
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type Episode = InferSchemaType<typeof episodeSchema>;

export default model<Episode>("Episode", episodeSchema);
