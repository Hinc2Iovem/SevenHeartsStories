import mongoose, { InferSchemaType, model } from "mongoose";

export const commandLibrarySchema = new mongoose.Schema({
  commandLibraryName: {
    type: String,
    required: true,
  },
  commandLibraryDescription: {
    type: String,
    required: true,
  },
});

type CommandLibrary = InferSchemaType<typeof commandLibrarySchema>;

export default model<CommandLibrary>("CommandLibrary", commandLibrarySchema);
