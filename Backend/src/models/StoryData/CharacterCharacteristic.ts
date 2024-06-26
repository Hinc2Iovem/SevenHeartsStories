import mongoose, { InferSchemaType, model } from "mongoose";

export const characterCharacteristicSchema = new mongoose.Schema({
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
});

type CharacterCharacteristic = InferSchemaType<
  typeof characterCharacteristicSchema
>;

export default model<CharacterCharacteristic>(
  "CharacterCharacteristic",
  characterCharacteristicSchema
);
