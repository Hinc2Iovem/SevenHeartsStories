import mongoose, {InferSchemaType, model} from "mongoose";

export const commandSoundSchema = new mongoose.Schema({
	flowchartCommandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommand",
	},
	soundName: {
		type: String,
	},
});

type CommandSound = InferSchemaType<typeof commandSoundSchema>;

export default model<CommandSound>("CommandSound", commandSoundSchema);
