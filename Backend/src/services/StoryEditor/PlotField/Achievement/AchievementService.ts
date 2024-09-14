import createHttpError from "http-errors";
import TranslationAchievement from "../../../../models/StoryData/Translation/TranslationAchievement";
import Achievement from "../../../../models/StoryEditor/PlotField/Achievement/Achievement";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
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

type CreateAchievementDuplicateTypes = {
  topologyBlockId: string;
  commandOrder?: number;
  storyId: string;
};
export const createAchievementDuplicateService = async ({
  topologyBlockId,
  commandOrder,
  storyId,
}: CreateAchievementDuplicateTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: storyId, valueName: "Story" });

  if (typeof commandOrder !== "number") {
    throw createHttpError(400, "CommandOrder is required");
  }

  const newPlotfieldCommand = await PlotFieldCommand.create({
    command: "achievement",
    commandOrder: commandOrder + 1,
    topologyBlockId,
  });
  const newAchievement = await Achievement.create({
    plotFieldCommandId: newPlotfieldCommand._id,
    storyId,
  });

  await TranslationAchievement.create({
    commandId: newPlotfieldCommand._id,
    topologyBlockId,
    language: "russian",
    translations: [],
    storyId,
  });

  const topologyBlockInfo = await TopologyBlock.findById(
    topologyBlockId
  ).exec();

  if (topologyBlockInfo) {
    if (topologyBlockInfo.topologyBlockInfo) {
      topologyBlockInfo.topologyBlockInfo.amountOfAchievements += 1;
    } else {
      topologyBlockInfo.topologyBlockInfo = {
        amountOfAchievements: 1,
        amountOfCommands: 1,
      };
    }
    await topologyBlockInfo.save();
  }

  return newAchievement;
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
