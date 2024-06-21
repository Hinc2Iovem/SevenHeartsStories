import mongoose, { InferSchemaType, model } from "mongoose";

export const commandWardrobeAppearancePartSchema = new mongoose.Schema({
  commandWardrobeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommandWardrobe",
  },
  appearancePartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppearancePart",
  },
});

type CommandWardrobeAppearancePart = InferSchemaType<
  typeof commandWardrobeAppearancePartSchema
>;

export default model<CommandWardrobeAppearancePart>(
  "CommandWardrobeAppearancePart",
  commandWardrobeAppearancePartSchema
);
