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
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type GetItem = InferSchemaType<typeof getItemSchema>;

export default model<GetItem>("GetItem", getItemSchema);
