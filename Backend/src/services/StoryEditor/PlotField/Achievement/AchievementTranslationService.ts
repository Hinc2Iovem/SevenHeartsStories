import createHttpError from "http-errors";
import { validateMongoId } from "../../../../utils/validateMongoId";
import TranslationAchievement from "../../../../models/StoryData/Translation/TranslationAchievement";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import Achievement from "../../../../models/StoryEditor/PlotField/Achievement/Achievement";
import TopologyBlockInfo from "../../../../models/StoryEditor/Topology/TopologyBlockInfo";

type AchievementByPlotFieldCommandIdTypes = {
  plotFieldCommandId: string;
  currentLanguage: string;
};

export const achievementTranslationByCommandIdService = async ({
  plotFieldCommandId,
  currentLanguage,
}: AchievementByPlotFieldCommandIdTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationAchievement.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).lean();

  if (!existingItem) {
    return null;
  }

  return existingItem;
};

type AchievementByStoryIdTypes = {
  storyId: string;
  currentLanguage: string;
};

export const getAllAchievementsTranslationByStoryIdService = async ({
  storyId,
  currentLanguage,
}: AchievementByStoryIdTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationAchievement.find({
    storyId,
    language: currentLanguage,
  }).lean();

  if (!existingItem.length) {
    return [];
  }

  return existingItem;
};

type AchievementByTopologyBlockIdTypes = {
  topologyBlockId: string;
  currentLanguage: string;
};

export const getAllAchievementsTranslationByTopologyBlockIdService = async ({
  topologyBlockId,
  currentLanguage,
}: AchievementByTopologyBlockIdTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, `CurrentLanguage is required`);
  }

  checkCurrentLanguage({ currentLanguage });

  const existingItem = await TranslationAchievement.find({
    topologyBlockId,
    language: currentLanguage,
  }).lean();

  if (!existingItem.length) {
    return [];
  }

  return existingItem;
};

type CreateAchievementTypes = {
  storyId: string;
  plotFieldCommandId: string;
  topologyBlockId: string;
};

export const createAchievementTranslationService = async ({
  storyId,
  plotFieldCommandId,
  topologyBlockId,
}: CreateAchievementTypes) => {
  validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
  validateMongoId({ value: storyId, valueName: "Story" });
  validateMongoId({ value: plotFieldCommandId, valueName: "PlotFieldCommand" });

  const existingPlotFieldCommand = await PlotFieldCommand.findById(
    plotFieldCommandId
  ).lean();
  if (!existingPlotFieldCommand) {
    throw createHttpError(400, "PlotFieldCommand with such id wasn't found");
  }

  const topologyBlockInfo = await TopologyBlockInfo.findOne({
    topologyBlockId,
  }).exec();
  if (topologyBlockInfo) {
    topologyBlockInfo.amountOfAchievements += 1;
    await topologyBlockInfo.save();
  }
  await TranslationAchievement.create({
    commandId: plotFieldCommandId,
    topologyBlockId,
    language: "russian",
    translations: [],
    storyId,
  });
  return await Achievement.create({ plotFieldCommandId, storyId });
};

type UpdateAchievementTypes = {
  plotFieldCommandId: string;
  topologyBlockId: string;
  storyId: string;
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage?: string;
};

export const achievementUpdateTranslationService = async ({
  plotFieldCommandId,
  text,
  textFieldName,
  currentLanguage,
  topologyBlockId,
  storyId,
}: UpdateAchievementTypes) => {
  validateMongoId({ value: plotFieldCommandId, valueName: "Achievement" });

  const existingPlotFieldCommand = await TranslationAchievement.findOne({
    commandId: plotFieldCommandId,
    language: currentLanguage,
  }).exec();

  if (existingPlotFieldCommand) {
    const currentTextFieldName = existingPlotFieldCommand.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingPlotFieldCommand.translations.push({
        text,
        textFieldName,
      });
    }

    return await existingPlotFieldCommand.save();
  } else {
    validateMongoId({ value: storyId, valueName: "Story" });
    validateMongoId({ value: topologyBlockId, valueName: "TopologyBlock" });
    return await TranslationAchievement.create({
      commandId: plotFieldCommandId,
      language: currentLanguage,
      topologyBlockId,
      storyId,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
