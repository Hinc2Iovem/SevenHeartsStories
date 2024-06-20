import mongoose, { InferSchemaType, model } from "mongoose";

export const nameSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  name: {
    type: String,
    required: true,
  },
});

type Name = InferSchemaType<typeof nameSchema>;

export default model<Name>("Name", nameSchema);
