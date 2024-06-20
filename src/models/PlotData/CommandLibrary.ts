import mongoose, { InferSchemaType, model } from "mongoose";

export const commandLibrarySchema = new mongoose.Schema({
  commandLibraryName: {
    type: String,
    required: true,
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
    required: true,
  },
});

type CommandLibrary = InferSchemaType<typeof commandLibrarySchema>;

export default model<CommandLibrary>("CommandLibrary", commandLibrarySchema);
