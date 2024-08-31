import mongoose, { InferSchemaType, model } from "mongoose";

export const translationEpisodeSchema = new mongoose.Schema(
  {
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
    },
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
    },
    episodeStatus: {
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

translationEpisodeSchema.index({ updatedAt: -1 });

type TranslationEpisode = InferSchemaType<typeof translationEpisodeSchema>;

export default model<TranslationEpisode>(
  "TranslationEpisode",
  translationEpisodeSchema
);
