import mongoose, { InferSchemaType, model } from "mongoose";

export const effectSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  effectName: {
    type: String,
    required: true,
  },
});

type Effect = InferSchemaType<typeof effectSchema>;

export default model<Effect>("Effect", effectSchema);
