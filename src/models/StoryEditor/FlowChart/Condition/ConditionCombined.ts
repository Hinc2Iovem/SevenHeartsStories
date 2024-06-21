import mongoose, {InferSchemaType, model} from "mongoose";

export const conditionCombinedSchema = new mongoose.Schema({
	flowchartCommandConditionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommandCondition",
	},
	logicalOperator: {
		type: String,
	},
});

type ConditionCombined = InferSchemaType<typeof conditionCombinedSchema>;

export default model<ConditionCombined>(
	"ConditionCombined",
	conditionCombinedSchema
);
