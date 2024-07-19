import mongoose, { InferSchemaType, model } from "mongoose";

export const nameSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  name: {
    type: String,
  },
});

type Name = InferSchemaType<typeof nameSchema>;

export default model<Name>("Name", nameSchema);
