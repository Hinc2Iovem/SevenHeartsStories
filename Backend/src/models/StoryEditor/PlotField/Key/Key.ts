import mongoose, { InferSchemaType, model } from "mongoose";

export const commandKeySchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  text: {
    type: String,
  },
});

type commandKey = InferSchemaType<typeof commandKeySchema>;

export default model<commandKey>("commandKey", commandKeySchema);
