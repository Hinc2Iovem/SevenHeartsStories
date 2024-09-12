import createHttpError from "http-errors";
import { TranslationTextFieldName } from "../../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import Episode from "../../../models/StoryData/Episode";
import Season from "../../../models/StoryData/Season";
import Story from "../../../models/StoryData/Story";
import TranslationEpisode from "../../../models/StoryData/Translation/TranslationEpisode";
import PlotFieldCommand from "../../../models/StoryEditor/PlotField/PlotFieldCommand";
import TopologyBlock from "../../../models/StoryEditor/Topology/TopologyBlock";
import TopologyBlockInfo from "../../../models/StoryEditor/Topology/TopologyBlockInfo";
import { checkCurrentLanguage } from "../../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../../utils/validateMongoId";
import { subDays, subHours, subMinutes } from "date-fns";

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

export const getEpisodeTranslationUpdatedAtAndLanguageService = async ({
  currentLanguage,
  updatedAt,
}: GetByUpdatedAtAndLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

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

  const existingTranslations = await TranslationEpisode.find({
    updatedAt: { $gte: startDate, $lt: endDate },
    language: currentLanguage,
  })
    .lean()
    .exec();

  if (!existingTranslations.length) {
    return [];
  }
  return existingTranslations;
};

type GetAllEpisodesByLanguageTypes = {
  currentLanguage?: string;
  seasonId: string;
};

export const getAllEpisodesTranslationsBySeasonIdAndLanguageService = async ({
  currentLanguage,
  seasonId,
}: GetAllEpisodesByLanguageTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });

  const existingEpisodes = await TranslationEpisode.find({
    language: currentLanguage,
    seasonId,
  }).lean();

  if (!existingEpisodes.length) {
    return [];
  }

  return existingEpisodes;
};

type GetEpisodesByTypeSearchId = {
  episodeStatus?: string;
  text?: string;
  currentLanguage?: string;
  seasonId?: string;
};

export const getAllEpisodesTranslationsByTypeAndSearchService = async ({
  episodeStatus,
  text,
  currentLanguage,
  seasonId,
}: GetEpisodesByTypeSearchId) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }

  const query: { seasonId?: string; episodeStatus?: string; language: string } =
    {
      language: currentLanguage,
    };

  if (episodeStatus) {
    query.episodeStatus = episodeStatus;
  }
  if (seasonId) {
    validateMongoId({ value: seasonId, valueName: "Season" });
    query.seasonId = seasonId;
  }

  const existingEpisodes = await TranslationEpisode.find(query).exec();

  if (!existingEpisodes.length) {
    return [];
  }

  const filteredEpisodes = text?.trim().length
    ? existingEpisodes.filter((ec) =>
        ec.translations[0].text?.toLowerCase()?.includes(text.toLowerCase())
      )
    : existingEpisodes;

  return filteredEpisodes;
};

type GetEpisodeByIdAndLanguageTypes = {
  episodeId: string;
  currentLanguage: string;
};

export const getEpisodeByIdAndLanguageService = async ({
  episodeId,
  currentLanguage,
}: GetEpisodeByIdAndLanguageTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "CurrentLanguage is required");
  }
  checkCurrentLanguage({ currentLanguage });
  const existingEpisode = await TranslationEpisode.findOne({
    episodeId,
    language: currentLanguage,
  }).lean();

  if (!existingEpisode) {
    return null;
  }

  return existingEpisode;
};

type EpisodeCreateTypes = {
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
  seasonId: string;
};

export const episodeCreateService = async ({
  seasonId,
  currentLanguage,
  description,
  title,
}: EpisodeCreateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });
  if (
    !title?.trim().length ||
    !description?.trim().length ||
    !currentLanguage?.trim().length
  ) {
    throw createHttpError(
      400,
      "Title, description and currentLanguage is required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const allEpisodesBySeasonId = await Episode.find({
    seasonId,
  }).countDocuments();

  const episodeOrder = allEpisodesBySeasonId ? allEpisodesBySeasonId : 0;
  const newEpisode = await Episode.create({
    episodeOrder,
    seasonId,
    episodeStaffInfo: [],
  });

  const translations = [
    {
      text: title,
      textFieldName: TranslationTextFieldName.EpisodeName,
    },
    {
      text: description,
      textFieldName: TranslationTextFieldName.EpisodeDescription,
    },
  ];

  const newEpisodeTranslation = await TranslationEpisode.create({
    episodeId: newEpisode._id,
    language: currentLanguage,
    translations,
    seasonId,
  });

  const currentSeason = await Season.findById(seasonId);
  if (!currentSeason) {
    throw createHttpError(400, "Season should have a story, firstly");
  }
  const currentStory = await Story.findById(currentSeason?.storyId).exec();
  if (currentStory) {
    currentStory.amountOfEpisodes += 1;
    await currentStory.save();
  }

  const firstTopologyBlock = await TopologyBlock.create({
    coordinatesX: 50,
    coordinatesY: 50,
    episodeId: newEpisode._id,
    name: "First",
    isStartingTopologyBlock: true,
    topologyBlockInfo: {
      amountOfCommands: 1,
    },
  });

  await PlotFieldCommand.create({
    commandOrder: 0,
    topologyBlockId: firstTopologyBlock._id,
  });

  return newEpisodeTranslation;
};

type EpisodeTranslationUpdateTypes = {
  episodeId: string;
  currentLanguage: string | undefined;
  text?: string;
  textFieldName?: string;
  seasonId?: string;
};

export const episodeTranslationUpdateService = async ({
  text,
  episodeId,
  currentLanguage,
  seasonId,
  textFieldName,
}: EpisodeTranslationUpdateTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });
  if (
    !text?.trim().length ||
    !textFieldName?.trim().length ||
    !currentLanguage?.trim().length
  ) {
    throw createHttpError(
      400,
      "Text, textFieldName and currentLanguage are required"
    );
  }

  checkCurrentLanguage({ currentLanguage });

  const existingEpisode = await TranslationEpisode.findOne({
    language: currentLanguage,
    episodeId,
  }).exec();

  if (existingEpisode) {
    const currentTextFieldName = existingEpisode.translations.find(
      (t) => t.textFieldName === textFieldName
    );
    if (currentTextFieldName) {
      currentTextFieldName.text = text;
    } else {
      existingEpisode.translations.push({
        text,
        textFieldName,
      });
    }

    return await existingEpisode.save();
  } else {
    validateMongoId({ value: seasonId, valueName: "Season" });
    return await TranslationEpisode.create({
      episodeId,
      language: currentLanguage,
      seasonId,
      translations: [
        {
          text,
          textFieldName,
        },
      ],
    });
  }
};
