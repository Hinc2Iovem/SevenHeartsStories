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

translationAppearancePartSchema.index({ updatedAt: -1 });

export interface TranslationAppearancePartDocument extends Document {
  characterId?: mongoose.Schema.Types.ObjectId;
  appearancePartId?: mongoose.Schema.Types.ObjectId;
  type: string;
  language: string;
  translations: {
    textFieldName: string;
    text?: string;
    amountOfWords: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default model<TranslationAppearancePartDocument>(
  "TranslationAppearancePart",
  translationAppearancePartSchema
);
