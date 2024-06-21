import mongoose, {InferSchemaType, model} from "mongoose";

export const appearancePartSchema = new mongoose.Schema({
	translationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Translation",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	wardrobeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Wardrobe",
	},
	CommandWardrobeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CommandWardrobe",
	},
	type: {
		type: String,
	},
});

type AppearancePart = InferSchemaType<typeof appearancePartSchema>;

export default model<AppearancePart>("AppearancePart", appearancePartSchema);
