import mongoose, { InferSchemaType, model } from "mongoose";

export const translationCommandWardrobeSchema = new mongoose.Schema(
  {
    commandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlotFieldCommand",
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

translationCommandWardrobeSchema.index({ updatedAt: -1 });

type TranslationCommandWardrobe = InferSchemaType<
  typeof translationCommandWardrobeSchema
>;

export default model<TranslationCommandWardrobe>(
  "TranslationCommandWardrobe",
  translationCommandWardrobeSchema
);
