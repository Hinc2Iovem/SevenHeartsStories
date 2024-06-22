import mongoose, { InferSchemaType, model } from "mongoose";

export const seasonSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type Season = InferSchemaType<typeof seasonSchema>;

export default model<Season>("Season", seasonSchema);
