import mongoose, { InferSchemaType, model } from "mongoose";

export const moveSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  moveValue: {
    type: Number,
    required: true,
  },
});

type Move = InferSchemaType<typeof moveSchema>;

export default model<Move>("Move", moveSchema);
