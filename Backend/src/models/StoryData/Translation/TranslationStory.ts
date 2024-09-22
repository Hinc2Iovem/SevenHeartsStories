import mongoose, { Document, InferSchemaType, model } from "mongoose";

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

translationStorySchema.index({ updatedAt: -1 });

export interface TranslationStoryDocument extends Document {
  storyId?: mongoose.Schema.Types.ObjectId;
  storyStatus: string;
  language: string;
  translations: {
    textFieldName: string;
    text?: string;
    amountOfWords: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default model<TranslationStoryDocument>(
  "TranslationStory",
  translationStorySchema
);
