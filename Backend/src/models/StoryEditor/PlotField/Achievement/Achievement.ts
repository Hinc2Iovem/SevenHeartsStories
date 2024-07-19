import mongoose, { InferSchemaType, model } from "mongoose";

// Translation "achievementName"

export const plotFieldCommandAchievementSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
});

type PlotFieldCommandAchievement = InferSchemaType<
  typeof plotFieldCommandAchievementSchema
>;

export default model<PlotFieldCommandAchievement>(
  "PlotFieldCommandAchievement",
  plotFieldCommandAchievementSchema
);
