import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "characterName",
// "characterDescription",
//  "characterUnknownName",

//   EmptyCharacter (есть только имя/переводится)
//   MinorCharacter (кроме имени есть:
//   unknownName, description, nameTag и список одежды)
//   Mainhero (кроме имени есть:
//   список одежды, список характеристик)

export const characterSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  nameTag: {
    type: String,
  },
  type: {
    type: String,
    default: "EmptyCharacter",
  },
  isMainCharacter: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
  },
});

type Character = InferSchemaType<typeof characterSchema>;

export default model<Character>("Character", characterSchema);
