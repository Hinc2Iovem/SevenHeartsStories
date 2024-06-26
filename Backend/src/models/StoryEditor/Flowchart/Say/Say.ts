import mongoose, { InferSchemaType, model } from "mongoose";

// type = "character | author"

export const flowchartCommandSaySchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  type: {
    type: String,
    default: "author",
  },
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  characterEmotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CharacterEmotion",
  },
});

type FlowchartCommandSay = InferSchemaType<typeof flowchartCommandSaySchema>;

export default model<FlowchartCommandSay>(
  "FlowchartCommandSay",
  flowchartCommandSaySchema
);
