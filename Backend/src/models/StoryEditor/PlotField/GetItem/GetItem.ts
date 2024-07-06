import mongoose, { InferSchemaType, model } from "mongoose";

// Translation ("buttonText",
//   "itemDescription",
//    "itemName"),

export const getItemSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
});

type GetItem = InferSchemaType<typeof getItemSchema>;

export default model<GetItem>("GetItem", getItemSchema);
