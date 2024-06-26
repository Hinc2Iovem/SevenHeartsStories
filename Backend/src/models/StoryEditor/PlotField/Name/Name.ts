import mongoose, { InferSchemaType, model } from "mongoose";

export const nameSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  characterName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});

type Name = InferSchemaType<typeof nameSchema>;

export default model<Name>("Name", nameSchema);
