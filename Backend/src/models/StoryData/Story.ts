import mongoose, { InferSchemaType, Document, model } from "mongoose";

export interface StoryDocument extends Document {
  amountOfEpisodes: number;
  storyStatus: string;
  imgUrl?: string | null;
}

// Translation "storyName" "storyGenre"
// storyStatus = doing | done
export const storySchema = new mongoose.Schema<StoryDocument>({
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
    default: null,
  },
});

type Story = InferSchemaType<typeof storySchema>;

export default model<Story>("Story", storySchema);
