import mongoose, { InferSchemaType, model } from "mongoose";

// type = "special" | "common"

export const characterSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
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
});

type Character = InferSchemaType<typeof characterSchema>;

export default model<Character>("Character", characterSchema);
