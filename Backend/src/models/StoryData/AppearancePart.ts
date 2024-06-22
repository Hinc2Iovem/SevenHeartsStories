import mongoose, { InferSchemaType, model } from "mongoose";

export const appearancePartSchema = new mongoose.Schema({
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  name: {
    type: String,
    required: true,
  },
  wardrobeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wardrobe",
  },
  type: {
    type: String,
    required: true,
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type AppearancePart = InferSchemaType<typeof appearancePartSchema>;

export default model<AppearancePart>("AppearancePart", appearancePartSchema);
