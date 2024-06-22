import createHttpError from "http-errors";
import Achievement from "../../../../models/StoryEditor/Flowchart/Achievement/Achievement";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Story from "../../../../models/StoryData/Story";

type CreateAchievementTypes = {
  storyId: string;
  flowchartCommandId: string;
};

export const createAchievementService = async ({
  flowchartCommandId,
  storyId,
}: CreateAchievementTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  validateMongoId({ value: flowchartCommandId, valueName: "FlowchartCommand" });

  const existingFlowchartCommand = await FlowchartCommand.findById(
    flowchartCommandId
  ).lean();
  if (!existingFlowchartCommand) {
    throw createHttpError(400, "FlowchartCommand with such id wasn't found");
  }

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, "Story with such id wasn't found");
  }

  return await Achievement.create({
    storyId,
    flowchartCommandId,
  });
};

type UpdateAchievementTypes = {
  achievementId: string;
  achievementName: string | undefined;
};

export const updateAchievementService = async ({
  achievementId,
  achievementName,
}: UpdateAchievementTypes) => {
  validateMongoId({ value: achievementId, valueName: "Achievement" });

  const existingAchievement = await Achievement.findById(achievementId).exec();
  if (!existingAchievement) {
    throw createHttpError(400, "Achievement with such id wasn't found");
  }

  if (!achievementName?.trim().length) {
    throw createHttpError(400, "Achievement is required");
  }

  existingAchievement.achievementName = achievementName;

  return await existingAchievement.save();
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
