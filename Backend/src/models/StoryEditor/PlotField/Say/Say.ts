import mongoose, { InferSchemaType, model } from "mongoose";

// type = "character | author"

export const plotFieldCommandSaySchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
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
  commandSide: {
    type: String,
    default: "right",
  },
});

type PlotFieldCommandSay = InferSchemaType<typeof plotFieldCommandSaySchema>;

export default model<PlotFieldCommandSay>(
  "PlotFieldCommandSay",
  plotFieldCommandSaySchema
);
