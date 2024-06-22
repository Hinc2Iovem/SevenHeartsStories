import mongoose, { InferSchemaType, model } from "mongoose";

// type = "special" | "common"

export const characterEmotionSchema = new mongoose.Schema({
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  emotionName: {
    type: String,
    required: true,
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type CharacterEmotion = InferSchemaType<typeof characterEmotionSchema>;

export default model<CharacterEmotion>(
  "CharacterEmotion",
  characterEmotionSchema
);
