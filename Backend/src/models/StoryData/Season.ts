import mongoose, { InferSchemaType, model } from "mongoose";

export const seasonSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
});

type Season = InferSchemaType<typeof seasonSchema>;

export default model<Season>("Season", seasonSchema);
