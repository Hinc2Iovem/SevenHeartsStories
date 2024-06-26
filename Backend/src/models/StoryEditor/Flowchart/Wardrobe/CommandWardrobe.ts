import mongoose, { InferSchemaType, model } from "mongoose";

export const commandWardrobeSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
});

type CommandWardrobe = InferSchemaType<typeof commandWardrobeSchema>;

export default model<CommandWardrobe>("CommandWardrobe", commandWardrobeSchema);
