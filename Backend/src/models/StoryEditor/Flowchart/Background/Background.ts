import mongoose, { InferSchemaType, model } from "mongoose";

export const flowchartCommandBackgroundSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  backgroundName: {
    type: String,
  },
  pointOfMovement: {
    type: Number,
  },
  musicName: {
    type: String,
  },
});

type FlowchartCommandBackground = InferSchemaType<
  typeof flowchartCommandBackgroundSchema
>;

export default model<FlowchartCommandBackground>(
  "FlowchartCommandBackground",
  flowchartCommandBackgroundSchema
);
