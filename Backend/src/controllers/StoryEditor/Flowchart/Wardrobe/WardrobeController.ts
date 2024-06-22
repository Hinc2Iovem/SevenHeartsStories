import { RequestHandler } from "express";
import {
  createCommandWardrobeAppearancePartService,
  createCommandWardrobeService,
  deleteCommandWardrobeService,
  updateCommandWardrobeService,
} from "../../../../services/StoryEditor/Flowchart/Wardrobe/WardrobeService";

type CreateCommandWardrobeParams = {
  flowchartCommandId: string;
};

export const createCommandWardrobeController: RequestHandler<
  CreateCommandWardrobeParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await createCommandWardrobeService({
      flowchartCommandId: req.params.flowchartCommandId,
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
};

type UpdateCommandWardrobeBody = {
  title: string | undefined;
};

export const updateCommandWardrobeController: RequestHandler<
  UpdateCommandWardrobeParams,
  unknown,
  UpdateCommandWardrobeBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await updateCommandWardrobeService({
      title: req.body.title,
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

type CreateCommandWardrobeAppearancePartParams = {
  commandWardrobeId: string;
  appearancePartId: string;
};

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
