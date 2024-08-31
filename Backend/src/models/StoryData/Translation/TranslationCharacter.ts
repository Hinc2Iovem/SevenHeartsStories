import mongoose, { InferSchemaType, model } from "mongoose";

export const translationCharacterSchema = new mongoose.Schema(
  {
    characterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    characterType: {
      type: String,
      default: "minorcharacter",
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

translationCharacterSchema.index({ updatedAt: -1 });

type TranslationCharacter = InferSchemaType<typeof translationCharacterSchema>;

export default model<TranslationCharacter>(
  "TranslationCharacter",
  translationCharacterSchema
);
