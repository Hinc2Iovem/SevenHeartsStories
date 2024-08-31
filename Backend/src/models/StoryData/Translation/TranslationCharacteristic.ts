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

type TranslationCharacteristic = InferSchemaType<
  typeof translationCharacteristicSchema
>;

export default model<TranslationCharacteristic>(
  "TranslationCharacteristic",
  translationCharacteristicSchema
);
