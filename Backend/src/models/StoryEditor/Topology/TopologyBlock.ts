import mongoose, {InferSchemaType, model} from "mongoose";

export const topologyBlockSchema = new mongoose.Schema({
	episodeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Episode",
	},
	topologyBlockId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TopologyBlock",
	},
	name: {
		type: String,
	},
	coordinatesX: {
		type: Number,
	},
	coordinatesY: {
		type: Number,
	},
});

type TopologyBlock = InferSchemaType<typeof topologyBlockSchema>;

export default model<TopologyBlock>("TopologyBlock", topologyBlockSchema);
