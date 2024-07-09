import mongoose, { InferSchemaType, Document, model } from "mongoose";

// Translation "storyName" "storyGenre"
// storyStatus = doing | done
export const storyInfoSchema = new mongoose.Schema({
  amountOfEpisodes: {
    type: Number,
    default: 0,
  },
  storyStatus: {
    type: String,
    default: "doing",
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
});

type StoryInfo = InferSchemaType<typeof storyInfoSchema>;

export default model<StoryInfo>("StoryInfo", storyInfoSchema);
