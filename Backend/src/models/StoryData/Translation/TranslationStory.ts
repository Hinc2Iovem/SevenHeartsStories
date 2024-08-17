import mongoose, { InferSchemaType, model } from "mongoose";

export const translationStorySchema = new mongoose.Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    storyStatus: {
      type: String,
      default: "doing",
    },
    language: {
      type: String,
      required: true,
    },
    translations: {
      type: [
        {
          textFieldName: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            // required: true,
          },
          amountOfWords: {
            type: Number,
            default: 0,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

type TranslationStory = InferSchemaType<typeof translationStorySchema>;

export default model<TranslationStory>(
  "TranslationStory",
  translationStorySchema
);
