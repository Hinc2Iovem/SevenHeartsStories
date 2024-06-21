import mongoose, {InferSchemaType, model} from "mongoose";

export const wardrobeSchema = new mongoose.Schema({
	storyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Story",
		required: true,
	},
	characterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Character",
		required: true,
	},
});

type Wardrobe = InferSchemaType<typeof wardrobeSchema>;

export default model<Wardrobe>("Wardrobe", wardrobeSchema);
