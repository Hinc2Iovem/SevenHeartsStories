import mongoose, { InferSchemaType, model } from "mongoose";

export const translationCharacteristicSchema = new mongoose.Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    language: {
      type: String,
      required: true,
    },
    characteristicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharacterCharacteristic",
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

translationCharacteristicSchema.index({ updatedAt: -1 });

export interface TranslationCharacteristicDocument extends Document {
  storyId?: mongoose.Schema.Types.ObjectId;
  characteristicId?: mongoose.Schema.Types.ObjectId;
  language: string;
  translations: {
    textFieldName: string;
    text?: string;
    amountOfWords: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
export default model<TranslationCharacteristicDocument>(
  "TranslationCharacteristic",
  translationCharacteristicSchema
);
