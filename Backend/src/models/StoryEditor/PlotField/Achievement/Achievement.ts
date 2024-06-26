import mongoose, { InferSchemaType, model } from "mongoose";

export const plotFieldCommandAchievementSchema = new mongoose.Schema({
  plotFieldCommandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlotFieldCommand",
  },
});

type PlotFieldCommandAchievement = InferSchemaType<
  typeof plotFieldCommandAchievementSchema
>;

export default model<PlotFieldCommandAchievement>(
  "PlotFieldCommandAchievement",
  plotFieldCommandAchievementSchema
);
