import { RequestHandler } from "express";
import {
  appearancePartTranslationUpdateNameTypeService,
  characterCharacteristicTranslationUpdateService,
  characterTranslationUpdateService,
  episodeTranslationUpdateService,
  getTranslationAchievementService,
  getTranslationAppearancePartService,
  getTranslationCharacterCharacteristicService,
  getTranslationCharacterService,
  getTranslationChoiceOptionService,
  getTranslationChoiceService,
  getTranslationCommandWardrobeService,
  getTranslationEpisodeService,
  getTranslationGetItemService,
  getTranslationSayService,
  getTranslationSeasonService,
  getTranslationStoryService,
  seasonTranslationUpdateTitleService,
  storyTranslationUpdateService,
  updateAchievementTranslationService,
  updateChoiceOptionTranslationService,
  updateChoiceTranslationService,
  updateCommandWardrobeTranslationService,
  updateGetItemTranslationService,
  updateSayTranslationTextService,
} from "../../services/Additional/TranslationService";
import { CharacterTypeAlias } from "../StoryData/CharacterController";

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

type GetAppearancePartBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/appearanceParts/:appearancePartId
// @access Private
export const getTranslationAppearancePartController: RequestHandler<
  GetAppearancePartParams,
  unknown,
  GetAppearancePartBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await getTranslationAppearancePartService({
      currentLanguage: req.body.currentLanguage,
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
  nameTag: string | undefined;
  type: CharacterTypeAlias | undefined;
  img: string | undefined;
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
      nameTag: req.body.nameTag,
      type: req.body.type,
      currentLanguage: req.body.currentLanguage,
      img: req.body.img,
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

type GetCharacterBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/characters/:characterId
// @access Private
export const getTranslationCharacterController: RequestHandler<
  GetCharacterParams,
  unknown,
  GetCharacterBody,
  unknown
> = async (req, res, next) => {
  try {
    const character = await getTranslationCharacterService({
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

// EPISODE____________________________________________________________

type EpisodeTranslationUpdateParams = {
  episodeId: string;
};
type EpisodeTranslationUpdateBody = {
  title: string | undefined;
  currentLanguage: string | undefined;
  description: string | undefined;
};

// @route PATCH http://localhost:3500/translation/episodes/:episodeId
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

type GetEpisodeBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/episodes/:episodeId
// @access Private
export const getTranslationEpisodeController: RequestHandler<
  GetEpisodeParams,
  unknown,
  GetEpisodeBody,
  unknown
> = async (req, res, next) => {
  try {
    const episode = await getTranslationEpisodeService({
      currentLanguage: req.body.currentLanguage,
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

// @route PATCH http://localhost:3500/translation/seasons/:seasonId
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

type GetSeasonBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translations/seasons/:seasonId
// @access Private
export const getTranslationSeasonController: RequestHandler<
  GetSeasonParams,
  unknown,
  GetSeasonBody,
  unknown
> = async (req, res, next) => {
  try {
    const season = await getTranslationSeasonService({
      currentLanguage: req.body.currentLanguage,
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

// @route PATCH http://localhost:3500/translation/stories/:storyId
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

type GetStoryBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/stories/:storyId
// @access Private
export const getTranslationStoryController: RequestHandler<
  GetStoryParams,
  unknown,
  GetStoryBody,
  unknown
> = async (req, res, next) => {
  try {
    const story = await getTranslationStoryService({
      currentLanguage: req.body.currentLanguage,
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
  characteristicId: string;
};

type CharacterCharacteristicTranslationUpdateBody = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/translation/characterCharacteristics/:characterCharacteristicId
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
        characteristicId: req.params.characteristicId,
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

type GetCharacterCharacteristicBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/characterCharacteristics/:characterCharacteristicId
// @access Private
export const getTranslationCharacterCharacteristicController: RequestHandler<
  GetCharacterCharacteristicParams,
  unknown,
  GetCharacterCharacteristicBody,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic =
      await getTranslationCharacterCharacteristicService({
        currentLanguage: req.body.currentLanguage,
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

// @route PATCH http://localhost:3500/translation/plotFieldCommands/achievements/:achievementId
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

type GetAchievementBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/plotFieldCommands/achievements/:achievementId
// @access Private
export const getTranslationAchievementController: RequestHandler<
  GetAchievementParams,
  unknown,
  GetAchievementBody,
  unknown
> = async (req, res, next) => {
  try {
    const achievement = await getTranslationAchievementService({
      currentLanguage: req.body.currentLanguage,
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

// @route PATCH http://localhost:3500/translation/plotFieldCommands/choices/:choiceId
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

type GetChoiceBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/plotFieldCommands/choices/:choiceId
// @access Private
export const getTranslationChoiceController: RequestHandler<
  GetChoiceParams,
  unknown,
  GetChoiceBody,
  unknown
> = async (req, res, next) => {
  try {
    const choice = await getTranslationChoiceService({
      currentLanguage: req.body.currentLanguage,
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

type GetChoiceOptionBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/plotFieldCommands/choices/options/:choiceOptionId
// @access Private
export const getTranslationChoiceOptionController: RequestHandler<
  GetChoiceOptionParams,
  unknown,
  GetChoiceOptionBody,
  unknown
> = async (req, res, next) => {
  try {
    const choiceOption = await getTranslationChoiceOptionService({
      currentLanguage: req.body.currentLanguage,
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

// @route PATCH http://localhost:3500/translation/plotFieldCommands/getItems/:getItemId
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

type GetGetItemBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/plotFieldCommands/getItem/:getItemId
// @access Private
export const getTranslationGetItemController: RequestHandler<
  GetGetItemParams,
  unknown,
  GetGetItemBody,
  unknown
> = async (req, res, next) => {
  try {
    const getItem = await getTranslationGetItemService({
      currentLanguage: req.body.currentLanguage,
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

// @route PATCH http://localhost:3500/translation/plotFieldCommands/say/:sayId
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

type GetSayBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/plotFieldCommands/say/:sayId
// @access Private
export const getTranslationSayController: RequestHandler<
  GetSayParams,
  unknown,
  GetSayBody,
  unknown
> = async (req, res, next) => {
  try {
    const say = await getTranslationSayService({
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

type GetCommandWardrobeBody = {
  currentLanguage: string | undefined;
};

// @route GET http://localhost:3500/translation/plotFieldCommands/commandWardrobe/:commandWardrobeId
// @access Private
export const getTranslationCommandWardrobeController: RequestHandler<
  GetCommandWardrobeParams,
  unknown,
  GetCommandWardrobeBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await getTranslationCommandWardrobeService({
      currentLanguage: req.body.currentLanguage,
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
