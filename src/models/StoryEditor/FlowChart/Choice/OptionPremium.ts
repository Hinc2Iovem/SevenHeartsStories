import mongoose, {InferSchemaType, model} from "mongoose";

export const flowchartCommandOptionPremiumSchema = new mongoose.Schema({
	flowchartCommandChoiceOptionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommandChoiceOption",
	},
	priceAmethysts: {
		type: Number,
		required: true,
	},
});

type FlowchartCommandOptionPremium = InferSchemaType<
	typeof flowchartCommandOptionPremiumSchema
>;

export default model<FlowchartCommandOptionPremium>(
	"FlowchartCommandOptionPremium",
	flowchartCommandOptionPremiumSchema
);
