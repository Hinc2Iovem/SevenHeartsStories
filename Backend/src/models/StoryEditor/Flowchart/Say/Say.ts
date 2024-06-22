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
  characterName: {
    type: String,
  },
  characterEmotion: {
    type: String,
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
  text: {
    type: String,
    required: true,
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type FlowchartCommandSay = InferSchemaType<typeof flowchartCommandSaySchema>;

export default model<FlowchartCommandSay>(
  "FlowchartCommandSay",
  flowchartCommandSaySchema
);
