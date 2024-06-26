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
  characterEmotion: {
    type: String,
  },
});

type FlowchartCommandSay = InferSchemaType<typeof flowchartCommandSaySchema>;

export default model<FlowchartCommandSay>(
  "FlowchartCommandSay",
  flowchartCommandSaySchema
);
