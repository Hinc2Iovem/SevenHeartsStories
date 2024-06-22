import mongoose, { InferSchemaType, model } from "mongoose";

export const effectSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  effectName: {
    type: String,
    required: true,
  },
});

type Effect = InferSchemaType<typeof effectSchema>;

export default model<Effect>("Effect", effectSchema);
