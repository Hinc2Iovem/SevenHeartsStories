import mongoose, { InferSchemaType, model } from "mongoose";

export const flowchartCommandAchievementSchema = new mongoose.Schema({
  flowchartCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlowchartCommand",
  },
  translationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Translation",
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
