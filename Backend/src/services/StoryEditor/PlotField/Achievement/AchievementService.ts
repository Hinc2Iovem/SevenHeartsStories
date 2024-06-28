import createHttpError from "http-errors";
import Achievement from "../../../../models/StoryEditor/PlotField/Achievement/Achievement";
import { validateMongoId } from "../../../../utils/validateMongoId";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import Story from "../../../../models/StoryData/Story";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";
import Translation from "../../../../models/StoryData/Translation";
import { TranslationTextFieldName } from "../../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";

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

type CreateAchievementTypes = {
  storyId: string;
  plotFieldCommandId: string;
};

export const createAchievementService = async ({
  plotFieldCommandId,
  storyId,
}: CreateAchievementTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const existingStory = await Story.findById(storyId).lean();
  if (!existingStory) {
    throw createHttpError(400, "Story with such id wasn't found");
  }

  const currentTopologyBlock = await TopologyBlock.findById(
    existingPlotFieldCommand.topologyBlockId
  ).lean();
  if (currentTopologyBlock) {
    const topologyBlockId = currentTopologyBlock._id;
    const topologyBlockInfo = await TopologyBlockInfo.findOne({
      topologyBlockId,
    }).exec();
    if (topologyBlockInfo) {
      topologyBlockInfo.amountOfAchievements += 1;
      await topologyBlockInfo.save();
    }
  }

  return await Achievement.create({
    storyId,
    plotFieldCommandId,
  });
};

type UpdateAchievementTypes = {
  achievementId: string;
  achievementName: string | undefined;
  currentLanguage: string | undefined;
};

export const updateAchievementService = async ({
  achievementId,
  achievementName,
  currentLanguage,
}: UpdateAchievementTypes) => {
  validateMongoId({ value: achievementId, valueName: "Achievement" });

  const existingAchievement = await Achievement.findById(achievementId).exec();
  if (!existingAchievement) {
    throw createHttpError(400, "Achievement with such id wasn't found");
  }

  if (!achievementName?.trim().length || !currentLanguage?.trim().length) {
    throw createHttpError(400, "Achievement and currentLanguage are required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    commandId: achievementId,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.AchievementName,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = achievementName;
    await existingTranslation.save();
  } else {
    return await Translation.create({
      commandId: existingAchievement._id,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.AchievementName,
      text: achievementName,
    });
  }

  return existingTranslation;
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
