import { RequestHandler } from "express";
import {
  createCommandWardrobeAppearancePartService,
  createCommandWardrobeService,
  deleteCommandWardrobeService,
  updateCommandWardrobeService,
} from "../../../../services/StoryEditor/PlotField/Wardrobe/WardrobeService";

type CreateCommandWardrobeParams = {
  plotFieldCommandId: string;
};

// @route PATCH http://localhost:3500/plotFieldCommands/:plotFieldCommandId/wardrobes
// @access Private
export const createCommandWardrobeController: RequestHandler<
  CreateCommandWardrobeParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await createCommandWardrobeService({
      plotFieldCommandId: req.params.plotFieldCommandId,
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

type UpdateCommandWardrobeParams = {
  commandWardrobeId: string;
  characterId: string;
};

type UpdateCommandWardrobeBody = {
  title: string | undefined;
  isCurrentDressed: boolean | undefined;
  currentLanguage: string | undefined;
};

// @route PATCH http://localhost:3500/plotFieldCommands/wardrobes/:commandWardrobeId
// @access Private
export const updateCommandWardrobeController: RequestHandler<
  UpdateCommandWardrobeParams,
  unknown,
  UpdateCommandWardrobeBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await updateCommandWardrobeService({
      currentLanguage: req.body.currentLanguage,
      isCurrentDressed: req.body.isCurrentDressed,
      title: req.body.title,
      commandWardrobeId: req.params.commandWardrobeId,
      characterId: req.params.characterId,
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

type CreateCommandWardrobeAppearancePartParams = {
  commandWardrobeId: string;
  appearancePartId: string;
};

// @route POST http://localhost:3500/plotFieldCommands/wardrobes/:commandWardrobeId/appearanceParts/:appearancePartId
// @access Private
export const createCommandWardrobeAppearancePartController: RequestHandler<
  CreateCommandWardrobeAppearancePartParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await createCommandWardrobeAppearancePartService({
      commandWardrobeId: req.params.commandWardrobeId,
      appearancePartId: req.params.appearancePartId,
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

type DeleteCommandWardrobeParams = {
  commandWardrobeId: string;
};

// @route DELETE http://localhost:3500/plotFieldCommands/wardrobes/:commandWardrobeId
// @access Private
export const deleteCommandWardrobeController: RequestHandler<
  DeleteCommandWardrobeParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await deleteCommandWardrobeService({
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
