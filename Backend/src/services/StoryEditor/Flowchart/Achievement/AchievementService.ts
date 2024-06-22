import createHttpError from "http-errors";
import Achievement from "../../../../models/StoryEditor/Flowchart/Achievement/Achievement";
import { validateMongoId } from "../../../../utils/validateMongoId";
import FlowchartCommand from "../../../../models/StoryEditor/Flowchart/FlowchartCommand";
import Story from "../../../../models/StoryData/Story";

type CreateAchievementTypes = {
  achievementName: string | undefined;
  storyId: string;
  flowchartCommandId: string;
};

export const createAchievementService = async ({
  achievementName,
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

  if (!achievementName?.trim().length) {
    throw createHttpError(400, "Achievement is required");
  }

  return await Achievement.create({
    achievementName,
    storyId,
    flowchartCommandId,
  });
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
