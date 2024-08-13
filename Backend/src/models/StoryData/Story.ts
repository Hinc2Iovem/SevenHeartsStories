import mongoose, { InferSchemaType, Document, model } from "mongoose";

type StoryStaffInfoTypes = {
  staffId: string;
  storyStatus: string;
};
export interface StoryDocument extends Document {
  amountOfEpisodes: number;
  storyStatus: string;
  imgUrl?: string | null;
  storyStaffInfo: StoryStaffInfoTypes[];
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
  storyStaffInfo: [
    {
      stafffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
      storyStatus: {
        type: String,
        default: "doing",
      },
    },
  ],
});

type Story = InferSchemaType<typeof storySchema>;

export default model<Story>("Story", storySchema);
