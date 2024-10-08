import { subDays, subHours, subMinutes } from "date-fns";
import createHttpError from "http-errors";
import {
  AvailableTextFieldNames,
  TranslationTextFieldName,
} from "../../consts/TRANSLATION_TEXT_FIELD_NAMES";
import AppearancePart from "../../models/StoryData/AppearancePart";
import Character from "../../models/StoryData/Character";
import CharacterCharacteristic from "../../models/StoryData/CharacterCharacteristic";
import Episode from "../../models/StoryData/Episode";
import Season from "../../models/StoryData/Season";
import Story from "../../models/StoryData/Story";
import Translation from "../../models/StoryData/Translation/Translation";
import Achievement from "../../models/StoryEditor/PlotField/Achievement/Achievement";
import Choice from "../../models/StoryEditor/PlotField/Choice/Choice";
import ChoiceOption from "../../models/StoryEditor/PlotField/Choice/ChoiceOption";
import GetItem from "../../models/StoryEditor/PlotField/GetItem/GetItem";
import Say from "../../models/StoryEditor/PlotField/Say/Say";
import CommandWardrobe from "../../models/StoryEditor/PlotField/Wardrobe/CommandWardrobe";
import Staff from "../../models/User/Staff";
import { checkCurrentLanguage } from "../../utils/checkCurrentLanguage";
import { validateMongoId } from "../../utils/validateMongoId";

// BY_COMMAND_ID____________________________________________________________________

type GetByCommandIdTypes = {
  commandId: string;
  currentLanguage: string | undefined;
};

export const getTranslationByCommandIdService = async ({
  currentLanguage,
  commandId,
}: GetByCommandIdTypes) => {
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId,
    language: currentLanguage,
  })
    .lean()
    .exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// BY_UPDATED_AT_AND_LANGUAGE____________________________________________________________________

type GetByUpdatedAtAndLanguageTypes = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

export const getTranslationUpdatedAtAndLanguageService = async ({
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

  const existingTranslations = await Translation.find({
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

// BY_TEXT_FIELD_NAME_AND_WORKER-STORY_STATUS_ASSIGNED_STORIES____________________________________________________________________

type GetByTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesTypes = {
  staffId: string;
  text: string | undefined;
  currentLanguage: string | undefined;
  storyStatus: string | undefined;
};

export const getTranslationTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesService =
  async ({
    staffId,
    currentLanguage,
    text,
    storyStatus,
  }: GetByTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesTypes) => {
    validateMongoId({ value: staffId, valueName: "Staff" });
    if (!currentLanguage?.trim().length || !storyStatus?.trim().length) {
      throw createHttpError(400, "Language and storyStatus are required");
    }

    checkCurrentLanguage({ currentLanguage });

    const existingStaff = await Staff.findById(staffId).lean();

    if (!existingStaff) {
      throw createHttpError(400, `User with such id wasn't found`);
    }

    const existingTranslations = await Translation.find({
      textFieldName: "storyName",
      language: currentLanguage,
    })
      .lean()
      .exec();

    const allAssignedStoriesByStaffId = await Story.find({
      "storyStaffInfo.staffId": staffId,
      "storyStaffInfo.storyStatus": storyStatus,
    }).lean();
    const allAssignedStoriesIds: string[] = [];
    for (const s of allAssignedStoriesByStaffId) {
      if (s) {
        allAssignedStoriesIds.push((s._id || "")?.toString());
      }
    }

    if (!existingTranslations.length) {
      return [];
    }

    if (text?.trim().length) {
      const filteredResults = existingTranslations.filter(
        (et) =>
          (et.text || "").toLowerCase().includes(text.toLowerCase()) &&
          allAssignedStoriesIds.includes((et.storyId || "")?.toString())
      );

      return filteredResults;
    } else {
      const filteredResults = existingTranslations.filter((et) =>
        allAssignedStoriesIds.includes((et.storyId || "")?.toString())
      );

      return filteredResults;
    }
  };
// BY_TEXT_FIELD_NAME_ASSIGNED_STORIES____________________________________________________________________

type GetByTextFieldNameAndSearchAssignedStoriesTypes = {
  staffId: string;
  text: string | undefined;
  currentLanguage: string | undefined;
};

export const getTranslationTextFieldNameAndSearchAssignedStoriesService =
  async ({
    staffId,
    currentLanguage,
    text,
  }: GetByTextFieldNameAndSearchAssignedStoriesTypes) => {
    validateMongoId({ value: staffId, valueName: "Staff" });
    if (!currentLanguage?.trim().length) {
      throw createHttpError(400, "Language is required");
    }

    checkCurrentLanguage({ currentLanguage });

    const existingStaff = await Staff.findById(staffId).lean();

    if (!existingStaff) {
      throw createHttpError(400, `User with such id wasn't found`);
    }

    const existingTranslations = await Translation.find({
      textFieldName: "storyName",
      language: currentLanguage,
    })
      .lean()
      .exec();

    const allAssignedStoriesByStaffId = await Story.find({
      "storyStaffInfo.staffId": staffId,
    }).lean();
    const allAssignedStoriesIds: string[] = [];
    for (const s of allAssignedStoriesByStaffId) {
      if (s) {
        allAssignedStoriesIds.push((s._id || "")?.toString());
      }
    }

    if (!existingTranslations.length) {
      return [];
    }

    if (text?.trim().length) {
      const filteredResults = existingTranslations.filter(
        (et) =>
          (et.text || "").toLowerCase().includes(text.toLowerCase()) &&
          allAssignedStoriesIds.includes((et.storyId || "")?.toString())
      );

      return filteredResults;
    } else {
      const filteredResults = existingTranslations.filter((et) =>
        allAssignedStoriesIds.includes((et.storyId || "")?.toString())
      );

      return filteredResults;
    }
  };
// BY_TEXT_FIELD_NAME___________________________________________________________________________

type GetByTextFieldNameTypes = {
  textFieldName: string | undefined;
  currentLanguage: string | undefined;
};

export const getTranslationTextFieldNameService = async ({
  currentLanguage,
  textFieldName,
}: GetByTextFieldNameTypes) => {
  if (!currentLanguage?.trim().length || !textFieldName?.trim().length) {
    throw createHttpError(400, "Language and textFieldName are required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (!AvailableTextFieldNames.includes(textFieldName)) {
    throw createHttpError(
      400,
      `Such textFieldName as ${textFieldName} isn't supported, here are some available textFieldNames: ${AvailableTextFieldNames.map(
        (tfn) => tfn
      )}`
    );
  }

  const existingTranslations = await Translation.find({
    textFieldName,
    language: currentLanguage,
  })
    .lean()
    .exec();

  if (!existingTranslations.length) {
    return [];
  }

  return existingTranslations;
};
// BY_TEXT_FIELD_NAME_AND_SEARCH____________________________________________________________________

type GetByTextFieldNameAndSearchTypes = {
  textFieldName: string | undefined;
  text: string | undefined;
  currentLanguage: string | undefined;
};

export const getTranslationTextFieldNameAndSearchService = async ({
  currentLanguage,
  text,
  textFieldName,
}: GetByTextFieldNameAndSearchTypes) => {
  if (!currentLanguage?.trim().length || !textFieldName?.trim().length) {
    throw createHttpError(400, "Language and textFieldName are required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (!AvailableTextFieldNames.includes(textFieldName)) {
    throw createHttpError(
      400,
      `Such textFieldName as ${textFieldName} isn't supported, here are some available textFieldNames: ${AvailableTextFieldNames.map(
        (tfn) => tfn
      )}`
    );
  }

  const existingTranslations = await Translation.find({
    textFieldName,
    language: currentLanguage,
  })
    .lean()
    .exec();

  if (!existingTranslations.length) {
    return [];
  }

  if (text?.trim().length) {
    const filteredResults = existingTranslations.filter((et) =>
      (et.text || "").toLowerCase().includes(text.toLowerCase())
    );
    return filteredResults;
  } else {
    return existingTranslations;
  }
};

// APPEARANCE_PART____________________________________________________________________

type AppearancePartUpdateTypes = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
  appearancePartId: string;
};

export const appearancePartTranslationUpdateNameTypeService = async ({
  appearancePartName,
  appearancePartType,
  appearancePartId,
  currentLanguage,
}: AppearancePartUpdateTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    appearancePartId: existingAppearancePart._id,
    language: currentLanguage,
  }).exec();

  if (appearancePartType?.trim().length) {
    existingAppearancePart.type = appearancePartType.toLowerCase();
    await existingAppearancePart.save();
  }

  if (!existingTranslation) {
    return await Translation.create({
      appearancePartId: existingAppearancePart.id,
      language: currentLanguage,
      text: appearancePartName ?? "",
      textFieldName: appearancePartType?.toLowerCase() ?? "",
    });
  } else {
    if (appearancePartName?.trim().length) {
      existingTranslation.text = appearancePartName;
    }
    if (appearancePartType?.trim().length) {
      existingTranslation.textFieldName = appearancePartType.toLowerCase();
    }

    await existingTranslation.save();
  }

  return existingTranslation;
};

type GetTranslationAppearancePartTypes = {
  currentLanguage: string | undefined;
  appearancePartId: string;
};

export const getTranslationAppearancePartService = async ({
  appearancePartId,
  currentLanguage,
}: GetTranslationAppearancePartTypes) => {
  validateMongoId({ value: appearancePartId, valueName: "appearancePart" });

  const existingAppearancePart = await AppearancePart.findById(
    appearancePartId
  ).exec();
  if (!existingAppearancePart) {
    throw createHttpError(400, "Such appearancePart doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    appearancePartId: existingAppearancePart._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation) {
    return null;
  }

  return existingTranslation;
};

// CHARACTER____________________________________________________________________

type UpdateCharacterTypes = {
  characterId: string;
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

export const characterTranslationUpdateService = async ({
  description,
  name,
  unknownName,
  characterId,
  currentLanguage,
}: UpdateCharacterTypes) => {
  validateMongoId({ value: characterId, valueName: "Character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Character with such id doesn't exist");
  }
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (name?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterName,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = name;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: name,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterName,
      });
    }
  }
  if (description?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterDescription,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = description;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: description,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterDescription,
      });
    }
  }

  if (unknownName?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterUnknownName,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = unknownName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterId,
        text: unknownName,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterUnknownName,
      });
    }
  }

  return await existingCharacter.save();
};

type GetTranslationCharacterTypes = {
  currentLanguage: string | undefined;
  characterId: string;
};

export const getTranslationCharacterService = async ({
  characterId,
  currentLanguage,
}: GetTranslationCharacterTypes) => {
  validateMongoId({ value: characterId, valueName: "character" });

  const existingCharacter = await Character.findById(characterId).exec();
  if (!existingCharacter) {
    throw createHttpError(400, "Such character doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    characterId: existingCharacter._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// EPISODE______________________________________________________________
type EpisodeUpdateTypes = {
  episodeId: string;
  title: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

export const episodeTranslationUpdateService = async ({
  episodeId,
  currentLanguage,
  description,
  title,
}: EpisodeUpdateTypes) => {
  validateMongoId({ value: episodeId, valueName: "Episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();

  if (!existingEpisode) {
    throw createHttpError(400, "Episode with such id doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }
  checkCurrentLanguage({ currentLanguage });

  if (title?.trim().length) {
    const existingTranslation = await Translation.findOne({
      episodeId: episodeId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.EpisodeName,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    } else {
      await Translation.create({
        episodeId: episodeId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.EpisodeName,
        text: title,
      });
    }
  }
  if (description?.trim().length) {
    const existingTranslation = await Translation.findOne({
      episodeId: episodeId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.EpisodeDescription,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = description;
      await existingTranslation.save();
    } else {
      await Translation.create({
        episodeId: episodeId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.EpisodeDescription,
        text: description,
      });
    }
  }

  return existingEpisode;
};

type GetTranslationEpisodeTypes = {
  currentLanguage: string | undefined;
  episodeId: string;
};

export const getTranslationEpisodeService = async ({
  episodeId,
  currentLanguage,
}: GetTranslationEpisodeTypes) => {
  validateMongoId({ value: episodeId, valueName: "episode" });

  const existingEpisode = await Episode.findById(episodeId).exec();
  if (!existingEpisode) {
    throw createHttpError(400, "Such episode doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    episodeId: existingEpisode._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// SEASON_________________________________________________________________
type SeasonTranslationUpdateTypes = {
  seasonId: string;
  title: string | undefined;
  currentLanguage: string | undefined;
};

export const seasonTranslationUpdateTitleService = async ({
  seasonId,
  title,
  currentLanguage,
}: SeasonTranslationUpdateTypes) => {
  validateMongoId({ value: seasonId, valueName: "Season" });

  const existingSeason = await Season.findById(seasonId).exec();

  if (!existingSeason) {
    throw createHttpError(400, "Season with such id doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }
  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    seasonId,
    language: currentLanguage,
  }).exec();

  if (existingTranslation) {
    if (title?.trim().length) {
      existingTranslation.text = title;
      await existingTranslation.save();
    }
  } else {
    if (title?.trim().length) {
      await Translation.create({
        seasonId,
        language: currentLanguage,
        text: title,
        textFieldName: TranslationTextFieldName.SeasonName,
      });
    }
  }

  return existingTranslation;
};

type GetTranslationSeasonTypes = {
  currentLanguage: string | undefined;
  seasonId: string;
};

export const getTranslationSeasonService = async ({
  seasonId,
  currentLanguage,
}: GetTranslationSeasonTypes) => {
  validateMongoId({ value: seasonId, valueName: "season" });

  const existingSeason = await Season.findById(seasonId).exec();
  if (!existingSeason) {
    throw createHttpError(400, "Such season doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    seasonId: existingSeason._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation) {
    return null;
  }

  return existingTranslation;
};

// STORY__________________________________________________________________

type StoryTranslationUpdateTypes = {
  storyId: string;
  title: string | undefined;
  genre: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

export const storyTranslationUpdateService = async ({
  storyId,
  description,
  genre,
  title,
  currentLanguage,
}: StoryTranslationUpdateTypes) => {
  validateMongoId({ value: storyId, valueName: "Story" });

  const existingStory = await Story.findById(storyId).exec();

  if (!existingStory) {
    throw createHttpError(400, "Story with such id doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (title?.trim().length) {
    const existingTranslation = await Translation.findOne({
      storyId: existingStory.id,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.StoryName,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = title;
      await existingTranslation.save();
    } else {
      await Translation.create({
        storyId: existingStory.id,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.StoryName,
        text: title,
      });
    }
  }

  if (description?.trim().length) {
    const existingTranslation = await Translation.findOne({
      storyId: existingStory.id,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.StoryDescription,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = description;
      await existingTranslation.save();
    } else {
      await Translation.create({
        storyId: existingStory.id,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.StoryDescription,
        text: description,
      });
    }
  }

  if (genre?.trim().length) {
    const existingTranslation = await Translation.findOne({
      storyId: existingStory.id,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.StoryGenre,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = genre;
      await existingTranslation.save();
    } else {
      await Translation.create({
        storyId: existingStory.id,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.StoryGenre,
        text: genre,
      });
    }
  }

  return existingStory;
};

type GetTranslationStoryTypes = {
  currentLanguage: string | undefined;
  storyId: string;
};

export const getTranslationStoryService = async ({
  storyId,
  currentLanguage,
}: GetTranslationStoryTypes) => {
  validateMongoId({ value: storyId, valueName: "story" });

  const existingStory = await Story.findById(storyId).exec();
  if (!existingStory) {
    throw createHttpError(400, "Such story doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    storyId: existingStory._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// CHARACTER_CHARACTERISTIC________________________________________________
type UpdateCharacterCharacteristicTypes = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
  characterCharacteristicId: string;
};

export const characterCharacteristicTranslationUpdateService = async ({
  currentLanguage,
  characterCharacteristicId,
  characteristicName,
}: UpdateCharacterCharacteristicTypes) => {
  const existingCharacteristic = await CharacterCharacteristic.findById(
    characterCharacteristicId
  ).exec();
  if (!existingCharacteristic) {
    throw createHttpError(400, "Characteristic with such id doesn't exist");
  }

  if (characteristicName?.trim().length) {
    const existingTranslation = await Translation.findOne({
      characterCharacteristicId: characterCharacteristicId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CharacterCharacteristic,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = characteristicName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        characterCharacteristicId: characterCharacteristicId,
        text: characteristicName,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.CharacterCharacteristic,
      });
    }
  }

  return existingCharacteristic;
};

type GetTranslationCharacterCharacteristicTypes = {
  currentLanguage: string | undefined;
  characterCharacteristicId: string;
};

export const getTranslationCharacterCharacteristicService = async ({
  characterCharacteristicId,
  currentLanguage,
}: GetTranslationCharacterCharacteristicTypes) => {
  validateMongoId({
    value: characterCharacteristicId,
    valueName: "characterCharacteristic",
  });

  const existingCharacterCharacteristic =
    await CharacterCharacteristic.findById(characterCharacteristicId).exec();
  if (!existingCharacterCharacteristic) {
    throw createHttpError(400, "Such characterCharacteristic doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    characterCharacteristicId: existingCharacterCharacteristic._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// ACHIEVEMENT____________________________________________________________
type UpdateAchievementTranslationTypes = {
  achievementId: string;
  achievementName: string | undefined;
  currentLanguage: string | undefined;
};

export const updateAchievementTranslationService = async ({
  achievementId,
  achievementName,
  currentLanguage,
}: UpdateAchievementTranslationTypes) => {
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

type GetTranslationAchievementTypes = {
  currentLanguage: string | undefined;
  achievementId: string;
};

export const getTranslationAchievementService = async ({
  achievementId,
  currentLanguage,
}: GetTranslationAchievementTypes) => {
  validateMongoId({
    value: achievementId,
    valueName: "achievement",
  });

  const existingAchievement = await Achievement.findById(achievementId).exec();
  if (!existingAchievement) {
    throw createHttpError(400, "Such achievement doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingAchievement._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};
export const getTranslationAchievementByPlotFieldCommandIdService = async ({
  achievementId,
  currentLanguage,
}: GetTranslationAchievementTypes) => {
  validateMongoId({
    value: achievementId,
    valueName: "achievement",
  });

  const existingAchievement = await Achievement.findOne({
    plotFieldCommandId: achievementId,
  }).exec();
  if (!existingAchievement) {
    throw createHttpError(400, "Such achievement doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingAchievement._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};
// CHOICE_OPTION__________________________________________________________
type UpdateChoiceTranslationTypes = {
  choiceQuestion: string | undefined;
  currentLanguage: string | undefined;
  choiceId: string;
};

export const updateChoiceTranslationService = async ({
  choiceQuestion,
  choiceId,
  currentLanguage,
}: UpdateChoiceTranslationTypes) => {
  validateMongoId({ value: choiceId, valueName: "Choice" });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Choice with such id wasn't found");
  }
  if (!choiceQuestion?.trim().length) {
    throw createHttpError(400, "Choice Question is required");
  }
  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    textFieldName: TranslationTextFieldName.ChoiceQuestion,
    language: currentLanguage,
    commandId: choiceId,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = choiceQuestion;
    return await existingTranslation.save();
  } else {
    return await Translation.create({
      commandId: choiceId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.ChoiceQuestion,
      text: choiceQuestion,
    });
  }
};

type GetTranslationChoiceTypes = {
  currentLanguage: string | undefined;
  choiceId: string;
};

export const getTranslationChoiceService = async ({
  choiceId,
  currentLanguage,
}: GetTranslationChoiceTypes) => {
  validateMongoId({
    value: choiceId,
    valueName: "choice",
  });

  const existingChoice = await Choice.findById(choiceId).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Such choice doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingChoice._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};
export const getTranslationChoiceByPlotFieldCommandIdService = async ({
  choiceId,
  currentLanguage,
}: GetTranslationChoiceTypes) => {
  validateMongoId({
    value: choiceId,
    valueName: "choice",
  });

  const existingChoice = await Choice.findOne({
    plotFieldCommandId: choiceId,
  }).exec();
  if (!existingChoice) {
    throw createHttpError(400, "Such choice doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingChoice._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// CHOICE_OPTION__________________________________________________________
type UpdateChoiceOptionTranslationTypes = {
  choiceOptionId: string;
  option: string | undefined;
  currentLanguage: string | undefined;
};

export const updateChoiceOptionTranslationService = async ({
  choiceOptionId,
  option,
  currentLanguage,
}: UpdateChoiceOptionTranslationTypes) => {
  validateMongoId({
    value: choiceOptionId,
    valueName: "ChoiceOption",
  });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Choice Option with such id wasn't found");
  }

  if (!option?.trim().length) {
    throw createHttpError(400, "option is required");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    choiceOptionId,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.ChoiceOption,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = option;
    return await existingTranslation.save();
  } else {
    return await Translation.create({
      choiceOptionId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.ChoiceOption,
      text: option,
    });
  }
};

type GetTranslationChoiceOptionTypes = {
  currentLanguage: string | undefined;
  choiceOptionId: string;
};

export const getTranslationChoiceOptionService = async ({
  choiceOptionId,
  currentLanguage,
}: GetTranslationChoiceOptionTypes) => {
  validateMongoId({
    value: choiceOptionId,
    valueName: "choiceOption",
  });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Such choiceOption doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    choiceOptionId: existingChoiceOption._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

export const getSingleTranslationChoiceOptionService = async ({
  choiceOptionId,
  currentLanguage,
}: GetTranslationChoiceOptionTypes) => {
  validateMongoId({
    value: choiceOptionId,
    valueName: "choiceOption",
  });

  const existingChoiceOption = await ChoiceOption.findById(
    choiceOptionId
  ).exec();
  if (!existingChoiceOption) {
    throw createHttpError(400, "Such choiceOption doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    choiceOptionId: existingChoiceOption._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation) {
    return null;
  }

  return existingTranslation;
};

// GET_ITEM_______________________________________________________________

type UpdateGetItemTranslationTypes = {
  getItemId: string;
  buttonText: string | undefined;
  itemDescription: string | undefined;
  itemName: string | undefined;
  currentLanguage: string | undefined;
};

export const updateGetItemTranslationService = async ({
  getItemId,
  buttonText,
  itemDescription,
  itemName,
  currentLanguage,
}: UpdateGetItemTranslationTypes) => {
  validateMongoId({ value: getItemId, valueName: "GetItem" });

  const existingGetItem = await GetItem.findById(getItemId).exec();

  if (!existingGetItem) {
    throw createHttpError(400, "GetItem with such id wasn't found");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  if (buttonText?.trim().length) {
    const existingTranslation = await Translation.findOne({
      commandId: getItemId,
      textFieldName: TranslationTextFieldName.ButtonText,
      language: currentLanguage,
    }).exec();

    if (existingTranslation) {
      existingTranslation.text = buttonText;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: getItemId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ButtonText,
        text: buttonText,
      });
    }
  }
  if (itemDescription?.trim().length) {
    const existingTranslation = await Translation.findOne({
      commandId: getItemId,
      textFieldName: TranslationTextFieldName.ItemDescription,
      language: currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = itemDescription;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: getItemId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ItemDescription,
        text: itemDescription,
      });
    }
  }
  if (itemName?.trim().length) {
    const existingTranslation = await Translation.findOne({
      commandId: getItemId,
      textFieldName: TranslationTextFieldName.ItemName,
      language: currentLanguage,
    }).exec();
    if (existingTranslation) {
      existingTranslation.text = itemName;
      await existingTranslation.save();
    } else {
      await Translation.create({
        commandId: getItemId,
        language: currentLanguage,
        textFieldName: TranslationTextFieldName.ItemName,
        text: itemName,
      });
    }
  }

  return existingGetItem;
};

type GetTranslationGetItemTypes = {
  currentLanguage: string | undefined;
  getItemId: string;
};

export const getTranslationGetItemService = async ({
  getItemId,
  currentLanguage,
}: GetTranslationGetItemTypes) => {
  validateMongoId({
    value: getItemId,
    valueName: "getItem",
  });

  const existingGetItem = await GetItem.findById(getItemId).exec();
  if (!existingGetItem) {
    throw createHttpError(400, "Such getItem doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingGetItem._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};
export const getTranslationGetItemByPlotFieldCommandIdService = async ({
  getItemId,
  currentLanguage,
}: GetTranslationGetItemTypes) => {
  validateMongoId({
    value: getItemId,
    valueName: "getItem",
  });

  const existingGetItem = await GetItem.findOne({
    plotFieldCommandId: getItemId,
  }).exec();
  if (!existingGetItem) {
    throw createHttpError(400, "Such getItem doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingGetItem._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// SAY___________________________________________________________________

type UpdateSayTranslationTextTypes = {
  text: string | undefined;
  currentLanguage: string | undefined;
  sayId: string;
};

export const updateSayTranslationTextService = async ({
  sayId,
  text,
  currentLanguage,
}: UpdateSayTranslationTextTypes) => {
  validateMongoId({ value: sayId, valueName: "Say" });

  const existingSay = await Say.findById(sayId).exec();
  if (!existingSay) {
    throw createHttpError(400, "Say with such id wasn't found");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "currentLanguage are required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.findOne({
    commandId: existingSay._id,
    language: currentLanguage,
    textFieldName: TranslationTextFieldName.SayText,
  }).exec();

  if (existingTranslation) {
    existingTranslation.text = text || "";
    await existingTranslation.save();
  } else {
    await Translation.create({
      commandId: existingSay._id,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.SayText,
      text,
    });
  }

  return existingSay;
};

type GetTranslationSayTypes = {
  currentLanguage: string | undefined;
  sayId: string;
};

export const getTranslationSayService = async ({
  sayId,
  currentLanguage,
}: GetTranslationSayTypes) => {
  validateMongoId({
    value: sayId,
    valueName: "say",
  });
  const existingSay = await Say.findById(sayId).exec();
  if (!existingSay) {
    throw createHttpError(400, "Such say doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingSay._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

export const getTranslationSayByPlotFieldCommandIdService = async ({
  sayId,
  currentLanguage,
}: GetTranslationSayTypes) => {
  validateMongoId({
    value: sayId,
    valueName: "say",
  });
  const existingSay = await Say.findOne({ plotFieldCommandId: sayId }).exec();
  if (!existingSay) {
    throw createHttpError(400, "Such say doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingSay._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

// COMMAND_WARDROBE________________________________________________________
type UpdateCommandWardrobeTranslationTypes = {
  title: string | undefined;
  currentLanguage: string | undefined;
  commandWardrobeId: string;
};

export const updateCommandWardrobeTranslationService = async ({
  title,
  currentLanguage,
  commandWardrobeId,
}: UpdateCommandWardrobeTranslationTypes) => {
  validateMongoId({ value: commandWardrobeId, valueName: "CommandWardrobe" });

  if (!title?.trim().length) {
    throw createHttpError(400, "Title is required");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }
  checkCurrentLanguage({ currentLanguage });

  const existingCommandWardrobe = await CommandWardrobe.findById(
    commandWardrobeId
  ).exec();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "CommandWardrobe with such id wasn't found");
  }

  const existingTranslation = await Translation.findOne({
    commandId: commandWardrobeId,
    textFieldName: TranslationTextFieldName.CommandWardrobeTitle,
    language: currentLanguage,
  });

  if (existingTranslation) {
    existingTranslation.text = title;
    await existingTranslation.save();
  } else {
    await Translation.create({
      commandId: commandWardrobeId,
      language: currentLanguage,
      textFieldName: TranslationTextFieldName.CommandWardrobeTitle,
      text: title,
    });
  }

  return existingCommandWardrobe;
};

type GetTranslationCommandWardrobeTypes = {
  currentLanguage: string | undefined;
  commandWardrobeId: string;
};

export const getTranslationCommandWardrobeService = async ({
  commandWardrobeId,
  currentLanguage,
}: GetTranslationCommandWardrobeTypes) => {
  validateMongoId({
    value: commandWardrobeId,
    valueName: "commandWardrobe",
  });

  const existingCommandWardrobe = await CommandWardrobe.findById(
    commandWardrobeId
  ).exec();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "Such commandWardrobe doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingCommandWardrobe._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};

export const getTranslationCommandWardrobeByPlotFieldCommandIdService = async ({
  commandWardrobeId,
  currentLanguage,
}: GetTranslationCommandWardrobeTypes) => {
  validateMongoId({
    value: commandWardrobeId,
    valueName: "commandWardrobe",
  });

  const existingCommandWardrobe = await CommandWardrobe.findOne({
    plotFieldCommandId: commandWardrobeId,
  }).exec();
  if (!existingCommandWardrobe) {
    throw createHttpError(400, "Such commandWardrobe doesn't exist");
  }

  if (!currentLanguage?.trim().length) {
    throw createHttpError(400, "Language is required");
  }

  checkCurrentLanguage({ currentLanguage });

  const existingTranslation = await Translation.find({
    commandId: existingCommandWardrobe._id,
    language: currentLanguage,
  }).exec();

  if (!existingTranslation.length) {
    return [];
  }

  return existingTranslation;
};
