import mongoose, { InferSchemaType, model } from "mongoose";

export const ambientSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  ambientName: {
    type: String,
  },
});

type Ambient = InferSchemaType<typeof ambientSchema>;

export default model<Ambient>("Ambient", ambientSchema);
