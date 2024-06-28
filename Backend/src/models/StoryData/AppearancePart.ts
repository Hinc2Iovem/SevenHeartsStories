import mongoose, { InferSchemaType, model } from "mongoose";

export const appearancePartSchema = new mongoose.Schema({
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  type: {
    type: String,
    required: true,
  },
});

type AppearancePart = InferSchemaType<typeof appearancePartSchema>;

export default model<AppearancePart>("AppearancePart", appearancePartSchema);
