import mongoose, { InferSchemaType, model } from "mongoose";

export const translationAchievementSchema = new mongoose.Schema(
  {
    commandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlotFieldCommand",
    },
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    topologyBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TopologyBlock",
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

type TranslationAchievement = InferSchemaType<
  typeof translationAchievementSchema
>;

export default model<TranslationAchievement>(
  "TranslationAchievement",
  translationAchievementSchema
);
