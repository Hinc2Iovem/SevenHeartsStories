import mongoose, {InferSchemaType, model} from "mongoose";

export const topologyBlockInfoSchema = new mongoose.Schema({
	topologyBlockId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TopologyBlock",
	},
	amountOfAchievements: {
		type: Number,
	},
	amountOfWords: {
		type: Number,
	},
	amountOfCharacterWords: {
		type: Number,
	},
	amountOfAuthorWords: {
		type: Number,
	},
	amountOfAmethysts: {
		type: Number,
	},
});

type TopologyBlockInfo = InferSchemaType<typeof topologyBlockInfoSchema>;

export default model<TopologyBlockInfo>(
	"TopologyBlockInfo",
	topologyBlockInfoSchema
);
