import mongoose, {InferSchemaType, model} from "mongoose";

export const flowchartCommandAchievementSchema = new mongoose.Schema({
	flowchartCommandId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "FlowchartCommand",
	},
	achievementName: {
		type: String,
		required: true,
	},
});

type FlowchartCommandAchievement = InferSchemaType<
	typeof flowchartCommandAchievementSchema
>;

export default model<FlowchartCommandAchievement>(
	"FlowchartCommandAchievement",
	flowchartCommandAchievementSchema
);
