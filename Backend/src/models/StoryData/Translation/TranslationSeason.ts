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

type TranslationSeason = InferSchemaType<typeof translationSeasonSchema>;

export default model<TranslationSeason>(
  "TranslationSeason",
  translationSeasonSchema
);
