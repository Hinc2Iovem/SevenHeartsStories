import mongoose, { InferSchemaType, model } from "mongoose";
// Translation = name(textFieldName === "body",
// "hair",
// "dress",
// "accessory",
// "emotion",
// "art",
// "skin")

export const appearancePartSchema = new mongoose.Schema({
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  type: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

type AppearancePart = InferSchemaType<typeof appearancePartSchema>;

export default model<AppearancePart>("AppearancePart", appearancePartSchema);
