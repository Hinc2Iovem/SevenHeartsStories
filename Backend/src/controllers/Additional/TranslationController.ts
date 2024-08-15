import { RequestHandler } from "express";
import {
  appearancePartTranslationUpdateNameTypeService,
  characterCharacteristicTranslationUpdateService,
  characterTranslationUpdateService,
  episodeTranslationUpdateService,
  getSingleTranslationChoiceOptionService,
  getTranslationAchievementByPlotFieldCommandIdService,
  getTranslationAchievementService,
  getTranslationAppearancePartService,
  getTranslationByCommandIdService,
  getTranslationCharacterCharacteristicService,
  getTranslationCharacterService,
  getTranslationChoiceByPlotFieldCommandIdService,
  getTranslationChoiceOptionService,
  getTranslationChoiceService,
  getTranslationCommandWardrobeByPlotFieldCommandIdService,
  getTranslationCommandWardrobeService,
  getTranslationEpisodeService,
  getTranslationGetItemByPlotFieldCommandIdService,
  getTranslationGetItemService,
  getTranslationSayByPlotFieldCommandIdService,
  getTranslationSayService,
  getTranslationSeasonService,
  getTranslationStoryService,
  getTranslationTextFieldNameAndSearchAssignedStoriesService,
  getTranslationTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesService,
  getTranslationTextFieldNameAndSearchService,
  getTranslationTextFieldNameService,
  getTranslationUpdatedAtAndLanguageService,
  seasonTranslationUpdateTitleService,
  storyTranslationUpdateService,
  updateAchievementTranslationService,
  updateChoiceOptionTranslationService,
  updateChoiceTranslationService,
  updateCommandWardrobeTranslationService,
  updateGetItemTranslationService,
  updateSayTranslationTextService,
} from "../../services/Additional/TranslationService";

// BY_COMMAND_ID__________________________________________________________

type GetByCommandIdParams = {
  commandId: string;
};
type GetByCommandIdQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/:commandId
// @access Private
export const getTranslationByCommandIdController: RequestHandler<
  GetByCommandIdParams,
  unknown,
  unknown,
  GetByCommandIdQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getTranslationByCommandIdService({
      currentLanguage: req.query.currentLanguage,
      commandId: req.params.commandId,
    });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// BY_UPDATE_AT_AND_LANGUAGE__________________________________________________________

type GetUpdatedAtAndLanguageQuery = {
  currentLanguage: string | undefined;
  updatedAt: string | undefined;
};

// @route GET http://localhost:3500/translations/recent
// @access Private
export const getTranslationUpdatedAtAndLanguageController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetUpdatedAtAndLanguageQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getTranslationUpdatedAtAndLanguageService({
      currentLanguage: req.query.currentLanguage,
      updatedAt: req.query.updatedAt,
    });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
// BY_TEXT_FIELD_NAME_AND_WORKER-STORY_STATUS_AssignedStories__________________________________________________________

type GetTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesParams = {
  staffId: string;
};

type GetTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesQuery = {
  currentLanguage: string | undefined;
  text: string | undefined;
  storyStatus: string | undefined;
};

// @route GET http://localhost:3500/translations/stories/staff/:staffId/textFieldNames/status/search
// @access Private
export const getTranslationTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesController: RequestHandler<
  GetTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesParams,
  unknown,
  unknown,
  GetTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getTranslationTextFieldNameAndSearchAssignedWorkerStoryStatusStoriesService(
        {
          staffId: req.params.staffId,
          currentLanguage: req.query.currentLanguage,
          text: req.query.text,
          storyStatus: req.query.storyStatus,
        }
      );
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
// BY_TEXT_FIELD_NAME_AssignedStories__________________________________________________________

type GetTextFieldNameAndSearchAssignedStoriesParams = {
  staffId: string;
};

type GetTextFieldNameAndSearchAssignedStoriesQuery = {
  currentLanguage: string | undefined;
  text: string | undefined;
};

// @route GET http://localhost:3500/translations/textFieldNames
// @access Private
export const getTranslationTextFieldNameAndSearchAssignedStoriesController: RequestHandler<
  GetTextFieldNameAndSearchAssignedStoriesParams,
  unknown,
  unknown,
  GetTextFieldNameAndSearchAssignedStoriesQuery
> = async (req, res, next) => {
  try {
    const textFieldName =
      await getTranslationTextFieldNameAndSearchAssignedStoriesService({
        staffId: req.params.staffId,
        currentLanguage: req.query.currentLanguage,
        text: req.query.text,
      });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// BY_TEXT_FIELD_NAME__________________________________________________________

type GetTextFieldNameQuery = {
  currentLanguage: string | undefined;
  textFieldName: string | undefined;
};

// @route GET http://localhost:3500/translations/textFieldNames
// @access Private
export const getTranslationTextFieldNameController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetTextFieldNameQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getTranslationTextFieldNameService({
      currentLanguage: req.query.currentLanguage,
      textFieldName: req.query.textFieldName,
    });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
// BY_TEXT_FIELD_NAME__AND_SEARCH__________________________________________________________

type GetTextFieldNameAndSearchQuery = {
  currentLanguage: string | undefined;
  textFieldName: string | undefined;
  text: string | undefined;
};

// @route GET http://localhost:3500/translations/textFieldNames/search
// @access Private
export const getTranslationTextFieldNameAndSearchController: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetTextFieldNameAndSearchQuery
> = async (req, res, next) => {
  try {
    const textFieldName = await getTranslationTextFieldNameAndSearchService({
      currentLanguage: req.query.currentLanguage,
      textFieldName: req.query.textFieldName,
      text: req.query.text,
    });
    if (textFieldName) {
      return res.status(201).json(textFieldName);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// APPEARANCE_PART__________________________________________________________

type AppearancePartUpdateParams = {
  appearancePartId: string;
};

type AppearancePartUpdateBody = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/appearanceParts/:appearancePartId
// @access Private
export const appearancePartTranslationControllerUpdateNameType: RequestHandler<
  AppearancePartUpdateParams,
  unknown,
  AppearancePartUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartTranslationUpdateNameTypeService(
      {
        appearancePartName: req.body.appearancePartName,
        appearancePartType: req.body.appearancePartType,
        currentLanguage: req.body.currentLanguage,
        appearancePartId: req.params.appearancePartId,
      }
    );
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAppearancePartParams = {
  appearancePartId: string;
};

type GetAppearancePartQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/appearanceParts/:appearancePartId
// @access Private
export const getTranslationAppearancePartController: RequestHandler<
  GetAppearancePartParams,
  unknown,
  unknown,
  GetAppearancePartQuery
> = async (req, res, next) => {
  try {
    const appearancePart = await getTranslationAppearancePartService({
      currentLanguage: req.query.currentLanguage,
      appearancePartId: req.params.appearancePartId,
    });
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// CHARACTER__________________________________________________________
type CharacterUpdateParams = {
  characterId: string;
};

type CharacterUpdateBody = {
  name: string | undefined;
  unknownName: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/characters/:characterId
// @access Private
export const characterTranslationUpdateController: RequestHandler<
  CharacterUpdateParams,
  unknown,
  CharacterUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await characterTranslationUpdateService({
      name: req.body.name,
      unknownName: req.body.unknownName,
      description: req.body.description,
      currentLanguage: req.body.currentLanguage,
      characterId: req.params.characterId,
    });
    if (character) {
      return res.status(201).json(character);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCharacterParams = {
  characterId: string;
};

type GetCharacterQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/characters/:characterId
// @access Private
export const getTranslationCharacterController: RequestHandler<
  GetCharacterParams,
  unknown,
  unknown,
  GetCharacterQuery
> = async (req, res, next) => {
  try {
    const character = await getTranslationCharacterService({
      currentLanguage: req.query.currentLanguage,
      characterId: req.params.characterId,
    });
    if (character) {
      return res.status(201).json(character);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// EPISODE____________________________________________________________

type EpisodeTranslationUpdateParams = {
  episodeId: string;
};
type EpisodeTranslationUpdateBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
  description: string | undefined;
};

// @route PATCH http://localhost:3500/translations/episodes/:episodeId
// @access Private
export const episodeTranslationUpdateController: RequestHandler<
  EpisodeTranslationUpdateParams,
  unknown,
  EpisodeTranslationUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await episodeTranslationUpdateService({
      episodeId: req.params.episodeId,
      currentLanguage: req.body.currentLanguage,
      title: req.body.title,
      description: req.body.description,
    });
    if (episode) {
      return res.status(201).json(episode);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetEpisodeParams = {
  episodeId: string;
};

type GetEpisodeQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/episodes/:episodeId
// @access Private
export const getTranslationEpisodeController: RequestHandler<
  GetEpisodeParams,
  unknown,
  unknown,
  GetEpisodeQuery
> = async (req, res, next) => {
  try {
    const episode = await getTranslationEpisodeService({
      currentLanguage: req.query.currentLanguage,
      episodeId: req.params.episodeId,
    });
    if (episode) {
      return res.status(201).json(episode);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// SEASON__________________________________________________________________

type SeasonTranslationUpdateTitleParams = {
  seasonId: string;
};
type SeasonTranslationUpdateTitleBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/seasons/:seasonId
// @access Private
export const seasonTranslationUpdateTitleController: RequestHandler<
  SeasonTranslationUpdateTitleParams,
  unknown,
  SeasonTranslationUpdateTitleBody,
  unknown
> = async (req, res, next) => {
  try {
    const season = await seasonTranslationUpdateTitleService({
      seasonId: req.params.seasonId,
      title: req.body.title,
      currentLanguage: req.body.currentLanguage,
    });
    if (season) {
      return res.status(201).json(season);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetSeasonParams = {
  seasonId: string;
};

type GetSeasonQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/seasons/:seasonId
// @access Private
export const getTranslationSeasonController: RequestHandler<
  GetSeasonParams,
  unknown,
  unknown,
  GetSeasonQuery
> = async (req, res, next) => {
  try {
    const season = await getTranslationSeasonService({
      currentLanguage: req.query.currentLanguage,
      seasonId: req.params.seasonId,
    });
    if (season) {
      return res.status(201).json(season);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// STORY________________________________________________________________

type StoryTranslationUpdateParams = {
  storyId: string;
};
type StoryTranslationUpdateBody = {
  title: string | undefined;
  genre: string | undefined;
  description: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/stories/:storyId
// @access Private
export const storyTranslationUpdateController: RequestHandler<
  StoryTranslationUpdateParams,
  unknown,
  StoryTranslationUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await storyTranslationUpdateService({
      storyId: req.params.storyId,
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      currentLanguage: req.body.currentLanguage,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetStoryParams = {
  storyId: string;
};

type GetStoryQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/stories/:storyId
// @access Private
export const getTranslationStoryController: RequestHandler<
  GetStoryParams,
  unknown,
  unknown,
  GetStoryQuery
> = async (req, res, next) => {
  try {
    const story = await getTranslationStoryService({
      currentLanguage: req.query.currentLanguage,
      storyId: req.params.storyId,
    });
    if (story) {
      return res.status(201).json(story);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// CHARACTER_CHARACTERISTIC________________________________________________

type CharacterCharacteristicTranslationUpdateParams = {
  characterCharacteristicId: string;
};

type CharacterCharacteristicTranslationUpdateBody = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/characterCharacteristics/:characterCharacteristicId
// @access Private
export const characterCharacteristicTranslationUpdateController: RequestHandler<
  CharacterCharacteristicTranslationUpdateParams,
  unknown,
  CharacterCharacteristicTranslationUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic =
      await characterCharacteristicTranslationUpdateService({
        characteristicName: req.body.characteristicName,
        characterCharacteristicId: req.params.characterCharacteristicId,
        currentLanguage: req.body.currentLanguage,
      });
    if (characterCharacteristic) {
      return res.status(201).json(characterCharacteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCharacterCharacteristicParams = {
  characterCharacteristicId: string;
};

type GetCharacterCharacteristicQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/characterCharacteristics/:characterCharacteristicId
// @access Private
export const getTranslationCharacterCharacteristicController: RequestHandler<
  GetCharacterCharacteristicParams,
  unknown,
  unknown,
  GetCharacterCharacteristicQuery
> = async (req, res, next) => {
  try {
    const characterCharacteristic =
      await getTranslationCharacterCharacteristicService({
        currentLanguage: req.query.currentLanguage,
        characterCharacteristicId: req.params.characterCharacteristicId,
      });
    if (characterCharacteristic) {
      return res.status(201).json(characterCharacteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// ACHIEVEMENT____________________________________________________________
type UpdateAchievementTranslationParams = {
  achievementId: string;
};

type UpdateAchievementTranslationBody = {
  achievementName: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/plotFieldCommands/achievements/:achievementId
// @access Private
export const updateAchievementTranslationController: RequestHandler<
  UpdateAchievementTranslationParams,
  unknown,
  UpdateAchievementTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await updateAchievementTranslationService({
      achievementId: req.params.achievementId,
      currentLanguage: req.body.currentLanguage,
      achievementName: req.body.achievementName,
    });
    if (achievement) {
      return res.status(201).json(achievement);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetAchievementParams = {
  achievementId: string;
};

type GetAchievementQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/achievements/:achievementId
// @access Private
export const getTranslationAchievementController: RequestHandler<
  GetAchievementParams,
  unknown,
  unknown,
  GetAchievementQuery
> = async (req, res, next) => {
  try {
    const achievement = await getTranslationAchievementService({
      currentLanguage: req.query.currentLanguage,
      achievementId: req.params.achievementId,
    });
    if (achievement) {
      return res.status(201).json(achievement);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/translations/plotFieldCommands/:plotFieldCommandId/achievements
// @access Private
export const getTranslationAchievementByPlotFieldCommandIdController: RequestHandler<
  GetAchievementParams,
  unknown,
  unknown,
  GetAchievementQuery
> = async (req, res, next) => {
  try {
    const achievement =
      await getTranslationAchievementByPlotFieldCommandIdService({
        currentLanguage: req.query.currentLanguage,
        achievementId: req.params.achievementId,
      });
    if (achievement) {
      return res.status(201).json(achievement);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
// CHOICE_________________________________________________________________

type UpdateChoiceTranslationParams = {
  choiceId: string;
};

type UpdateChoiceTranslationBody = {
  choiceQuestion: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/plotFieldCommands/choices/:choiceId
// @access Private
export const updateChoiceTranslationController: RequestHandler<
  UpdateChoiceTranslationParams,
  unknown,
  UpdateChoiceTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await updateChoiceTranslationService({
      currentLanguage: req.body.currentLanguage,
      choiceQuestion: req.body.choiceQuestion,
      choiceId: req.params.choiceId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetChoiceParams = {
  choiceId: string;
};

type GetChoiceQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/choices/:choiceId
// @access Private
export const getTranslationChoiceController: RequestHandler<
  GetChoiceParams,
  unknown,
  unknown,
  GetChoiceQuery
> = async (req, res, next) => {
  try {
    const choice = await getTranslationChoiceService({
      currentLanguage: req.query.currentLanguage,
      choiceId: req.params.choiceId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/translations/plotFieldCommands/:plotFieldCommandId/choices
// @access Private
export const getTranslationChoiceByPlotFieldCommandIdController: RequestHandler<
  GetChoiceParams,
  unknown,
  unknown,
  GetChoiceQuery
> = async (req, res, next) => {
  try {
    const choice = await getTranslationChoiceByPlotFieldCommandIdService({
      currentLanguage: req.query.currentLanguage,
      choiceId: req.params.choiceId,
    });
    if (choice) {
      return res.status(201).json(choice);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// CHOICE_OPTION__________________________________________________________

type UpdateChoiceOptionTranslationParams = {
  choiceOptionId: string;
};

type UpdateChoiceOptionTranslationBody = {
  option: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/choices/options/:choiceOptionId
// @access Private
export const updateChoiceOptionTranslationController: RequestHandler<
  UpdateChoiceOptionTranslationParams,
  unknown,
  UpdateChoiceOptionTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await updateChoiceOptionTranslationService({
      option: req.body.option,
      choiceOptionId: req.params.choiceOptionId,
      currentLanguage: req.body.currentLanguage,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetChoiceOptionParams = {
  choiceOptionId: string;
};

type GetChoiceOptionQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/choices/options/:choiceOptionId
// @access Private
export const getTranslationChoiceOptionController: RequestHandler<
  GetChoiceOptionParams,
  unknown,
  unknown,
  GetChoiceOptionQuery
> = async (req, res, next) => {
  try {
    const choiceOption = await getTranslationChoiceOptionService({
      currentLanguage: req.query.currentLanguage,
      choiceOptionId: req.params.choiceOptionId,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/translations/plotFieldCommands/choices/option/:choiceOptionId
// @access Private
export const getSingleTranslationChoiceOptionController: RequestHandler<
  GetChoiceOptionParams,
  unknown,
  unknown,
  GetChoiceOptionQuery
> = async (req, res, next) => {
  try {
    const choiceOption = await getSingleTranslationChoiceOptionService({
      currentLanguage: req.query.currentLanguage,
      choiceOptionId: req.params.choiceOptionId,
    });
    if (choiceOption) {
      return res.status(201).json(choiceOption);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// GET_ITEM______________________________________________________________

type UpdateGetItemTranslationParams = {
  getItemId: string;
};
type UpdateGetItemTranslationBody = {
  buttonText: string | undefined;
  itemDescription: string | undefined;
  itemName: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/plotFieldCommands/getItems/:getItemId
// @access Private
export const updateGetItemTranslationController: RequestHandler<
  UpdateGetItemTranslationParams,
  unknown,
  UpdateGetItemTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await updateGetItemTranslationService({
      buttonText: req.body.buttonText,
      getItemId: req.params.getItemId,
      itemDescription: req.body.itemDescription,
      itemName: req.body.itemName,
      currentLanguage: req.body.currentLanguage,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetGetItemParams = {
  getItemId: string;
};

type GetGetItemQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/getItems/:getItemId
// @access Private
export const getTranslationGetItemController: RequestHandler<
  GetGetItemParams,
  unknown,
  unknown,
  GetGetItemQuery
> = async (req, res, next) => {
  try {
    const getItem = await getTranslationGetItemService({
      currentLanguage: req.query.currentLanguage,
      getItemId: req.params.getItemId,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/translations/plotFieldCommands/:getItem/getItems
// @access Private
export const getTranslationGetItemByPlotFieldCommandIdController: RequestHandler<
  GetGetItemParams,
  unknown,
  unknown,
  GetGetItemQuery
> = async (req, res, next) => {
  try {
    const getItem = await getTranslationGetItemByPlotFieldCommandIdService({
      currentLanguage: req.query.currentLanguage,
      getItemId: req.params.getItemId,
    });
    if (getItem) {
      return res.status(201).json(getItem);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// SAY________________________________________________________________

type UpdateSayTranslationParams = {
  sayId: string;
};

type UpdateSayTranslationBody = {
  text: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translations/plotFieldCommands/say/:sayId
// @access Private
export const updateSayTranslationTextController: RequestHandler<
  UpdateSayTranslationParams,
  unknown,
  UpdateSayTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await updateSayTranslationTextService({
      text: req.body.text,
      currentLanguage: req.body.currentLanguage,
      sayId: req.params.sayId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetSayParams = {
  sayId: string;
};

type GetSayQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/say/:sayId
// @access Private
export const getTranslationSayController: RequestHandler<
  GetSayParams,
  unknown,
  unknown,
  GetSayQuery
> = async (req, res, next) => {
  try {
    const say = await getTranslationSayService({
      currentLanguage: req.query.currentLanguage,
      sayId: req.params.sayId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/translations/plotFieldCommands/:plotFieldCommandId/say
// @access Private
export const getTranslationSayByPlotFieldCommandIdController: RequestHandler<
  GetSayParams,
  unknown,
  unknown,
  GetSayQuery
> = async (req, res, next) => {
  try {
    const say = await getTranslationSayByPlotFieldCommandIdService({
      currentLanguage: req.query.currentLanguage,
      sayId: req.params.sayId,
    });
    if (say) {
      return res.status(201).json(say);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// COMMAND_WARDROBE_________________________________________________________

type UpdateCommandWardrobeTranslationParams = {
  commandWardrobeId: string;
};

type UpdateCommandWardrobeTranslationBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/wardrobes/:commandWardrobeId
// @access Private
export const updateCommandWardrobeTranslationController: RequestHandler<
  UpdateCommandWardrobeTranslationParams,
  unknown,
  UpdateCommandWardrobeTranslationBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await updateCommandWardrobeTranslationService({
      title: req.body.title,
      commandWardrobeId: req.params.commandWardrobeId,
      currentLanguage: req.body.currentLanguage,
    });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

type GetCommandWardrobeParams = {
  commandWardrobeId: string;
};

type GetCommandWardrobeQuery = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/plotFieldCommands/commandWardrobe/:commandWardrobeId
// @access Private
export const getTranslationCommandWardrobeController: RequestHandler<
  GetCommandWardrobeParams,
  unknown,
  unknown,
  GetCommandWardrobeQuery
> = async (req, res, next) => {
  try {
    const commandWardrobe = await getTranslationCommandWardrobeService({
      currentLanguage: req.query.currentLanguage,
      commandWardrobeId: req.params.commandWardrobeId,
    });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/translations/plotFieldCommands/:plotFieldCommandId/commandWardrobe
// @access Private
export const getTranslationCommandWardrobeByPlotFieldCommandIdController: RequestHandler<
  GetCommandWardrobeParams,
  unknown,
  unknown,
  GetCommandWardrobeQuery
> = async (req, res, next) => {
  try {
    const commandWardrobe =
      await getTranslationCommandWardrobeByPlotFieldCommandIdService({
        currentLanguage: req.query.currentLanguage,
        commandWardrobeId: req.params.commandWardrobeId,
      });
    if (commandWardrobe) {
      return res.status(201).json(commandWardrobe);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
