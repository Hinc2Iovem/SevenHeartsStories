import mongoose, { InferSchemaType, model } from "mongoose";

export const moveSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  moveValue: {
    type: Number,
    required: true,
  },
});

type Move = InferSchemaType<typeof moveSchema>;

export default model<Move>("Move", moveSchema);
