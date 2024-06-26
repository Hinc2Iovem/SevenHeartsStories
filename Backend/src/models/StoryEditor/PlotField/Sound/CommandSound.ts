import mongoose, { InferSchemaType, model } from "mongoose";

export const commandSoundSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  soundName: {
    type: String,
  },
});

type CommandSound = InferSchemaType<typeof commandSoundSchema>;

export default model<CommandSound>("CommandSound", commandSoundSchema);
