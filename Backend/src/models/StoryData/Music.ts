import mongoose, { InferSchemaType, model } from "mongoose";

export const musicSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  musicName: {
    type: String,
  },
});

type Music = InferSchemaType<typeof musicSchema>;

export default model<Music>("Music", musicSchema);
