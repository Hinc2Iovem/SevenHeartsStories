import mongoose, { InferSchemaType, model } from "mongoose";

// type = "special" | "common"

export const characterSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  name: {
    type: String,
    required: true,
  },
  unknownName: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  nameTag: {
    type: String,
  },
  type: {
    type: String,
    default: "common",
  },
  isMainCharacter: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type Character = InferSchemaType<typeof characterSchema>;

export default model<Character>("Character", characterSchema);
