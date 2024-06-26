import mongoose, { InferSchemaType, model } from "mongoose";

export const suitSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
  },
  suitName: {
    type: String,
    required: true,
  },
});

type Suit = InferSchemaType<typeof suitSchema>;

export default model<Suit>("Suit", suitSchema);
