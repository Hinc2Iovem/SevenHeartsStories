import mongoose, { InferSchemaType, model } from "mongoose";

export const commandWardrobeSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
});

type CommandWardrobe = InferSchemaType<typeof commandWardrobeSchema>;

export default model<CommandWardrobe>("CommandWardrobe", commandWardrobeSchema);
