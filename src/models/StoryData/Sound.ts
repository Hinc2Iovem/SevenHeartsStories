import mongoose, {InferSchemaType, model} from "mongoose";

export const soundSchema = new mongoose.Schema({
	storyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Story",
	},
	soundName: {
		type: String,
	},
});

type Sound = InferSchemaType<typeof soundSchema>;

export default model<Sound>("Sound", soundSchema);
