import mongoose, { InferSchemaType, model } from "mongoose";

export const translationAppearancePartSchema = new mongoose.Schema(
  {
    appearancePartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppearancePart",
    },
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
    type: {
      type: String,
      required: true,
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

type TranslationAppearancePart = InferSchemaType<
  typeof translationAppearancePartSchema
>;

export default model<TranslationAppearancePart>(
  "TranslationAppearancePart",
  translationAppearancePartSchema
);
