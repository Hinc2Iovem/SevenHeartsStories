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
  currentLanguage: {
    type: String,
    default: "russian",
  },
});

type FlowchartCommandAchievement = InferSchemaType<
  typeof flowchartCommandAchievementSchema
>;

export default model<FlowchartCommandAchievement>(
  "FlowchartCommandAchievement",
  flowchartCommandAchievementSchema
);
