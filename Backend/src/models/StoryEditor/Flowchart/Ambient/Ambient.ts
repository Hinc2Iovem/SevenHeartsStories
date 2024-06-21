import mongoose, {InferSchemaType, model} from "mongoose";

export const ambientSchema = new mongoose.Schema({
	flowchartCommandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommand",
	},
	ambientName: {
		type: String,
		required: true,
	},
});

type Ambient = InferSchemaType<typeof ambientSchema>;

export default model<Ambient>("Ambient", ambientSchema);
