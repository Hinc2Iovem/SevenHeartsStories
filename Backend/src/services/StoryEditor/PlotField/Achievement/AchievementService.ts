import createHttpError from "http-errors";
import Story from "../../../../models/StoryData/Story";
import Achievement from "../../../../models/StoryEditor/PlotField/Achievement/Achievement";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetAchievementByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
};

export const getAchievementByPlotFieldCommandIdService = async ({
  plotFieldCommandId,
}: GetAchievementByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingAchievement = await Achievement.findOne({
    plotFieldCommandId,
  }).lean();

  if (!existingAchievement) {
    return null;
  }

  return existingAchievement;
};

type GetAchievementByStoryIdTypes = {
  storyId: string;
};
export const getAchievementsByStoryIdService = async ({
  storyId,
}: GetAchievementByStoryIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingAchievements = await Achievement.find({
    storyId,
  }).lean();

  if (!existingAchievements.length) {
    return [];
  }

  return existingAchievements;
};

type DeleteAchievementTypes = {
  achievementId: string;
};

export const deleteAchievementService = async ({
  achievementId,
}: DeleteAchievementTypes) => {
  validateMongoId({ value: achievementId, valueName: "Achievement" });

  await Achievement.findByIdAndDelete(achievementId);

  return `Achievement with id ${achievementId} was removed`;
};
