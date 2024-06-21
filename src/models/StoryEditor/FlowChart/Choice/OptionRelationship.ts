import mongoose, {InferSchemaType, model} from "mongoose";

export const flowchartCommandOptionRelationshipSchema = new mongoose.Schema({
	flowchartCommandChoiceOptionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommandChoiceOption",
	},
	characterName: {
		type: String,
		required: true,
	},
	amountOfPoints: {
		type: Number,
		required: true,
	},
});

type FlowchartCommandOptionRelationship = InferSchemaType<
	typeof flowchartCommandOptionRelationshipSchema
>;

export default model<FlowchartCommandOptionRelationship>(
	"FlowchartCommandOptionRelationship",
	flowchartCommandOptionRelationshipSchema
);
