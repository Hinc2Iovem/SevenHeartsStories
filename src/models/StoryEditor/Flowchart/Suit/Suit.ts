import mongoose, {InferSchemaType, model} from "mongoose";

export const suitSchema = new mongoose.Schema({
	flowchartCommandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommand",
	},
	suitName: {
		type: String,
		required: true,
	},
});

type Suit = InferSchemaType<typeof suitSchema>;

export default model<Suit>("Suit", suitSchema);
