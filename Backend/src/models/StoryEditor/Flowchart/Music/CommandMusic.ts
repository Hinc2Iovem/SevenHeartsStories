import mongoose, { InferSchemaType, model } from "mongoose";

export const commandMusicSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  musicName: {
    type: String,
    required: true,
  },
});

type commandMusic = InferSchemaType<typeof commandMusicSchema>;

export default model<commandMusic>("CommandMusic", commandMusicSchema);
