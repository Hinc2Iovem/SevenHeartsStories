import mongoose, { InferSchemaType, model } from "mongoose";

export const storyGenreSchema = new mongoose.Schema({
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  genre: {
    type: String,
    required: true,
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type StoryGenre = InferSchemaType<typeof storyGenreSchema>;

export default model<StoryGenre>("StoryGenre", storyGenreSchema);
