import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "characterCharacteristic",

export const characterCharacteristicSchema = new mongoose.Schema({});

type CharacterCharacteristic = InferSchemaType<
  typeof characterCharacteristicSchema
>;

export default model<CharacterCharacteristic>(
  "CharacterCharacteristic",
  characterCharacteristicSchema
);
