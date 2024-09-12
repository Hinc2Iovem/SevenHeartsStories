import mongoose, { InferSchemaType, model } from "mongoose";

export const ifModelSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  amountOfCommandsInsideIf: {
    type: Number,
    default: 0,
  },
  amountOfCommandsInsideElse: {
    type: Number,
    default: 0,
  },
});

type IfModel = InferSchemaType<typeof ifModelSchema>;

export default model<IfModel>("IfModel", ifModelSchema);
