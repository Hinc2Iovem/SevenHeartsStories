import mongoose, { InferSchemaType, model } from "mongoose";

export const storySchema = new mongoose.Schema({
  amountOfEpisodes: {
    type: Number,
    default: 0,
  },
  imgUrl: {
    type: String,
  },
});

type Story = InferSchemaType<typeof storySchema>;

export default model<Story>("Story", storySchema);
