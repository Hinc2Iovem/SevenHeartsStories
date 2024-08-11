import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "characterCharacteristic",

export const characterCharacteristicSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
});

type CharacterCharacteristic = InferSchemaType<
  typeof characterCharacteristicSchema
>;

export default model<CharacterCharacteristic>(
  "CharacterCharacteristic",
  characterCharacteristicSchema
);
