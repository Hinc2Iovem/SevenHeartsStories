import { RequestHandler } from "express";
import {
  createCommandWardrobeAppearancePartService,
  createCommandWardrobeService,
  deleteCommandWardrobeService,
} from "../../../../services/StoryEditor/Flowchart/Wardrobe/WardrobeService";

type CreateCommandWardrobeParams = {
  flowchartCommandId: string;
};

type CreateCommandWardrobeBody = {
  title: string | undefined;
};

export const createCommandWardrobeController: RequestHandler<
  CreateCommandWardrobeParams,
  unknown,
  CreateCommandWardrobeBody,
  unknown
> = async (req, res, next) => {
  try {
    const commandWardrobe = await createCommandWardrobeService({
      title: req.body.title,
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
