import { RequestHandler } from "express";
import {
  appearancePartCreateService,
  appearancePartDeleteService,
  appearancePartGetAllService,
  appearancePartGetByCharacterIdAndTypeService,
  appearancePartGetByCharacterIdService,
  appearancePartUpdateImgService,
  appearancePartGetByAppearancePartIdService,
} from "../../services/StoryData/AppearancePartService";
import { AppearancePartsTypes } from "../../consts/APPEARANCE_PARTS";

// @route GET http://localhost:3500/appearanceParts
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

type AppearancePartGetByAppearancePartIdParams = {
  appearancePartId: string;
};

// @route GET http://localhost:3500/appearanceParts/:appearancePartId
// @access Private
export const appearancePartGetByAppearancePartIdController: RequestHandler<
  AppearancePartGetByAppearancePartIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartGetByAppearancePartIdService({
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
type AppearancePartGetByCharacterIdAndTypeParams = {
  characterId: string;
};
type AppearancePartGetByCharacterIdAndTypeQuery = {
  type: AppearancePartsTypes;
};

// @route GET http://localhost:3500/appearanceParts/characters/:characterId/type?type
// @access Private
export const appearancePartGetByCharacterIdAndTypeController: RequestHandler<
  AppearancePartGetByCharacterIdAndTypeParams,
  unknown,
  unknown,
  AppearancePartGetByCharacterIdAndTypeQuery
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartGetByCharacterIdAndTypeService({
      characterId: req.params.characterId,
      type: req.query.type,
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
  img: string | undefined;
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
      img: req.body.img,
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

type AppearancePartUpdateImgParams = {
  appearancePartId: string;
};
type AppearancePartUpdateImgBody = {
  imgUrl: string | undefined;
};

// @route PATCH http://localhost:3500/appearanceParts/:appearancePartId/img
// @access Private
export const appearancePartControllerUpdateImg: RequestHandler<
  AppearancePartUpdateImgParams,
  unknown,
  AppearancePartUpdateImgBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartUpdateImgService({
      appearancePartId: req.params.appearancePartId,
      imgUrl: req.body.imgUrl,
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
