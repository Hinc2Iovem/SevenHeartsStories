import mongoose, {InferSchemaType, model} from "mongoose";

export const flowchartCommandOptionCharacteristicSchema = new mongoose.Schema({
	flowchartCommandChoiceOptionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommandChoiceOption",
	},
	translationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Translation",
	},
	amountOfPoints: {
		type: Number,
	},
	characteristicName: {
		type: String,
		required: true,
	},
});

type FlowchartCommandOptionCharacteristic = InferSchemaType<
	typeof flowchartCommandOptionCharacteristicSchema
>;

export default model<FlowchartCommandOptionCharacteristic>(
	"FlowchartCommandOptionCharacteristic",
	flowchartCommandOptionCharacteristicSchema
);
