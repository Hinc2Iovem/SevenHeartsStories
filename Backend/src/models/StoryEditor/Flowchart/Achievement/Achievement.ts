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
});

type FlowchartCommandAchievement = InferSchemaType<
  typeof flowchartCommandAchievementSchema
>;

export default model<FlowchartCommandAchievement>(
  "FlowchartCommandAchievement",
  flowchartCommandAchievementSchema
);
