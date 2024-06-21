import { RequestHandler } from "express";
import {
  appearancePartCreateService,
  appearancePartDeleteService,
  appearancePartUpdateNameTypeService,
} from "../../services/StoryData/AppearancePartService";

type AppearancePartCreateBody = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
};

// @route POST http://localhost:3500/appearanceParts
// @access Private
export const appearancePartControllerCreate: RequestHandler<
  unknown,
  unknown,
  AppearancePartCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartCreateService({
      appearancePartName: req.body.appearancePartName,
      appearancePartType: req.body.appearancePartType,
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

type AppearancePartUpdateParams = {
  appearancePartId: string;
};

type AppearancePartUpdateBody = {
  appearancePartName: string | undefined;
  appearancePartType: string | undefined;
};

// @route PATCH http://localhost:3500/appearanceParts/:appearancePartId/nameType
// @access Private
export const appearancePartControllerUpdateNameType: RequestHandler<
  AppearancePartUpdateParams,
  unknown,
  AppearancePartUpdateBody,
  unknown
> = async (req, res, next) => {
  try {
    const appearancePart = await appearancePartUpdateNameTypeService({
      appearancePartName: req.body.appearancePartName,
      appearancePartType: req.body.appearancePartType,
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
type AppearancePartDeleteParams = {
  appearancePartId: string;
};

// @route DELETE http://localhost:3500/appearanceParts/:appearancePartId
// @access Private
export const appearancePartControllerDeleteNameType: RequestHandler<
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
