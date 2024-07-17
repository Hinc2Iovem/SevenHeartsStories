import mongoose, { InferSchemaType, model } from "mongoose";

export const ifModelSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
});

type IfModel = InferSchemaType<typeof ifModelSchema>;

export default model<IfModel>("IfModel", ifModelSchema);
