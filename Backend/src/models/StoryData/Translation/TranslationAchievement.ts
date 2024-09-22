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

translationAchievementSchema.index({ updatedAt: -1 });

export interface TranslationAchievementDocument extends Document {
  commandId?: mongoose.Schema.Types.ObjectId;
  storyId?: mongoose.Schema.Types.ObjectId;
  topologyBlockId?: mongoose.Schema.Types.ObjectId;
  language: string;
  translations: {
    textFieldName: string;
    text?: string;
    amountOfWords: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default model<TranslationAchievementDocument>(
  "TranslationAchievement",
  translationAchievementSchema
);
