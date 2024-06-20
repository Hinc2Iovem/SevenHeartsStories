import mongoose, { InferSchemaType, model } from "mongoose";

export const getItemSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
  },
});

type GetItem = InferSchemaType<typeof getItemSchema>;

export default model<GetItem>("GetItem", getItemSchema);
