import mongoose, { InferSchemaType, model } from "mongoose";

export const storySchema = new mongoose.Schema({
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  title: {
    type: String,
    required: true,
  },
  amountOfEpisodes: {
    type: Number,
  },
  genre: {
    type: [String],
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

type Story = InferSchemaType<typeof storySchema>;

export default model<Story>("Story", storySchema);
