import mongoose, { InferSchemaType, model } from "mongoose";

export const waitSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  waitValue: {
    type: Number,
  },
});

type Wait = InferSchemaType<typeof waitSchema>;

export default model<Wait>("Wait", waitSchema);
