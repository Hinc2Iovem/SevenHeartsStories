import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "storyName" "storyGenre"
// storyStatus = doing | done
export const storySchema = new mongoose.Schema({
  amountOfEpisodes: {
    type: Number,
    default: 0,
  },
  storyStatus: {
    type: String,
    default: "doing",
  },
  imgUrl: {
    type: String,
  },
});

type Story = InferSchemaType<typeof storySchema>;

export default model<Story>("Story", storySchema);
