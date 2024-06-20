import mongoose, { InferSchemaType, model } from "mongoose";

export const commandWardrobeSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
});

type CommandWardrobe = InferSchemaType<typeof commandWardrobeSchema>;

export default model<CommandWardrobe>("CommandWardrobe", commandWardrobeSchema);
