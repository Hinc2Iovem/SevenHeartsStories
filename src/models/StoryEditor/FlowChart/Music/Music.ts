import mongoose, { InferSchemaType, model } from "mongoose";

export const musicSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  musicName: {
    type: String,
    required: true,
  },
});

type Music = InferSchemaType<typeof musicSchema>;

export default model<Music>("Music", musicSchema);
