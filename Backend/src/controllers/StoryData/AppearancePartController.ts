import { RequestHandler } from "express";
import {
  appearancePartCreateService,
  appearancePartDeleteService,
  appearancePartGetAllService,
  appearancePartGetByCharacterIdService,
} from "../../services/StoryData/AppearancePartService";

// @route GET http://localhost:3500/appearanceParts/characters/:characterId
// @access Private
export const appearancePartGetAllController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const appearancePart = await appearancePartGetAllService();
    if (appearancePart) {
      return res.status(201).json(appearancePart);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
type AppearancePartGetByCharacterIdParams = {
  characterId: string;
};

// @route GET http://localhost:3500/appearanceParts/characters/:characterId
// @access Private
export const appearancePartGetByCharacterIdController: RequestHandler<
  AppearancePartGetByCharacterIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartGetByCharacterIdService({
      characterId: req.params.characterId,
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

type AppearancePartCreateParams = {
  characterId: string;
};

type AppearancePartCreateBody = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/appearanceParts/characters/:characterId
// @access Private
export const appearancePartControllerCreate: RequestHandler<
  AppearancePartCreateParams,
  unknown,
  AppearancePartCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartCreateService({
      appearancePartName: req.body.appearancePartName,
      appearancePartType: req.body.appearancePartType,
      currentLanguage: req.body.currentLanguage,
      characterId: req.params.characterId,
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

type AppearancePartDeleteParams = {
  appearancePartId: string;
};

// @route DELETE http://localhost:3500/appearanceParts/:appearancePartId
// @access Private
export const appearancePartControllerDelete: RequestHandler<
  AppearancePartDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartDeleteService({
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
