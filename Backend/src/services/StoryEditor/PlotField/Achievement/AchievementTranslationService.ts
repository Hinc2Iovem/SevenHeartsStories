import { subDays, subHours, subMinutes } from "date-fns";
import createHttpError from "http-errors";
import TranslationAchievement, {
  TranslationAchievementDocument,
} from "../../../../models/StoryData/Translation/TranslationAchievement";
import Achievement from "../../../../models/StoryEditor/PlotField/Achievement/Achievement";
import PlotFieldCommand from "../../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../../models/StoryEditor/Topology/TopologyBlock";
import { checkCurrentLanguage } from "../../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../../utils/validateMongoId";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

type ResultTypes = {
  next: {
    page: number;
    limit: number;
  };
  prev: {
    page: number;
    limit: number;
  };
  results: TranslationAchievementDocument[];
  amountOfAchievements: number;
};

export const getAchievementTranslationUpdatedAtAndLanguageService = async ({
  currentLanguage,
  updatedAt,
  limit,
  page,
}: GetByUpdatedAtAndLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (!page || !limit) {
    throw createHttpError(400, "Page and limit are required");
  }

  let startDate: Date | undefined;
  let endDate = new Date();

  switch (updatedAt) {
    case "30min":
      startDate = subMinutes(endDate, 30);
      break;
    case "1hr":
      startDate = subHours(endDate, 1);
      break;
    case "5hr":
      startDate = subHours(endDate, 5);
      break;
    case "1d":
      startDate = subDays(endDate, 1);
      break;
    case "3d":
      startDate = subDays(endDate, 3);
      break;
    case "7d":
      startDate = subDays(endDate, 7);
      break;
    default:
      throw createHttpError(400, "Invalid updatedAt value");
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const results = {} as ResultTypes;

  if (
    endIndex <
    (await TranslationAchievement.countDocuments({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    }).exec())
  ) {
    results.next = {
      page: pageNumber + 1,
      limit: limitNumber,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: pageNumber - 1,
      limit: limitNumber,
    };
  }
  results.results =
    (await TranslationAchievement.find({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    })
      .limit(limitNumber)
      .skip(startIndex)
      .exec()) || [];
  const overAllAmountOfAchievements =
    await TranslationAchievement.countDocuments({
      language: currentLanguage,
      updatedAt: { $gte: startDate, $lt: endDate },
    });
  results.amountOfAchievements = overAllAmountOfAchievements;

  return results;
};

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
  textFieldName: string;
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
        amountOfWords: text?.length || 0,
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
