import mongoose, { InferSchemaType, model } from "mongoose";

export const conditionSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
});

type Condition = InferSchemaType<typeof conditionSchema>;

export default model<Condition>("Condition", conditionSchema);
