import mongoose, { InferSchemaType, model } from "mongoose";

export const translationSeasonSchema = new mongoose.Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
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

translationSeasonSchema.index({ updatedAt: -1 });

export interface TranslationSeasonDocument extends Document {
  storyId?: mongoose.Schema.Types.ObjectId;
  seasonId?: mongoose.Schema.Types.ObjectId;
  language: string;
  translations: {
    textFieldName: string;
    text?: string;
    amountOfWords: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default model<TranslationSeasonDocument>(
  "TranslationSeason",
  translationSeasonSchema
);
