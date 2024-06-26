import mongoose, { InferSchemaType, model } from "mongoose";

export const appearancePartSchema = new mongoose.Schema({
  wardrobeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wardrobe",
  },
  type: {
    type: String,
    required: true,
  },
});

type AppearancePart = InferSchemaType<typeof appearancePartSchema>;

export default model<AppearancePart>("AppearancePart", appearancePartSchema);
