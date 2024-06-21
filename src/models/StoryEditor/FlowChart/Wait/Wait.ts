import mongoose, {InferSchemaType, model} from "mongoose";

export const waitSchema = new mongoose.Schema({
	flowchartCommandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommand",
	},
	waitValue: {
		type: Number,
		required: true,
	},
});

type Wait = InferSchemaType<typeof waitSchema>;

export default model<Wait>("Wait", waitSchema);
