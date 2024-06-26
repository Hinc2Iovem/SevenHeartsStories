import mongoose, { InferSchemaType, model } from "mongoose";

export const commandKeySchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  targetBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopologyBlock",
  },
});

type commandKey = InferSchemaType<typeof commandKeySchema>;

export default model<commandKey>("commandKey", commandKeySchema);
