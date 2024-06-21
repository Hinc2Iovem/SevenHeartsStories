import mongoose, {InferSchemaType, model} from "mongoose";

export const audioSchema = new mongoose.Schema({
	storyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Story",
	},
	audioName: {
		type: String,
	},
});

type Audio = InferSchemaType<typeof audioSchema>;

export default model<Audio>("Audio", audioSchema);
