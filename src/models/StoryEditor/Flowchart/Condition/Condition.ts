import mongoose, {InferSchemaType, model} from "mongoose";

export const conditionSchema = new mongoose.Schema({
	flowchartCommandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommand",
	},
	targetBlockId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TopologyBlock",
	},
	isCombined: {
		type: Boolean,
	},
	isElse: {
		type: Boolean,
		default: false,
	},
});

type Condition = InferSchemaType<typeof conditionSchema>;

export default model<Condition>("Condition", conditionSchema);
