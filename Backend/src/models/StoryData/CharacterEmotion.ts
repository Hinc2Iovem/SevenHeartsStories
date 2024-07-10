import mongoose, { InferSchemaType, model } from "mongoose";

export const characterEmotionSchema = new mongoose.Schema({
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  emotionName: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

type CharacterEmotion = InferSchemaType<typeof characterEmotionSchema>;

export default model<CharacterEmotion>(
  "CharacterEmotion",
  characterEmotionSchema
);
