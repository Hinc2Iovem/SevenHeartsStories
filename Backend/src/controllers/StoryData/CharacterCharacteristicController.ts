import { RequestHandler } from "express";
import {
  characterCharacteristicDeleteService,
  characterCharacteristicCreateService,
  characterCharacteristicGetByCharacterIdService,
  characterCharacteristicGetByIdService,
} from "../../services/StoryData/CharacterCharacteristicService";

type CharacterCharacteristicGetByIdParams = {
  characterCharacteristicId: string;
};

// @route GET http://localhost:3500/characterCharacteristics/:characterCharacteristicId
// @access Private
export const characterCharacteristicGetByIdController: RequestHandler<
  CharacterCharacteristicGetByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic = await characterCharacteristicGetByIdService(
      {
        characterCharacteristicId: req.params.characterCharacteristicId,
      }
    );
    if (characterCharacteristic) {
      return res.status(201).json(characterCharacteristic);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

// @route GET http://localhost:3500/characterCharacteristics
// @access Private
export const characterCharacteristicGetByCharacterIdController: RequestHandler =
  async (req, res, next) => {
    try {
      const characterCharacteristic =
        await characterCharacteristicGetByCharacterIdService();
      if (characterCharacteristic) {
        return res.status(201).json(characterCharacteristic);
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    } catch (error) {
      next(error);
    }
  };

type CharacterCharacteristicCreateBody = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/characterCharacteristics
// @access Private
export const characterCharacteristicCreateController: RequestHandler<
  unknown,
  unknown,
  CharacterCharacteristicCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic = await characterCharacteristicCreateService({
      characteristicName: req.body.characteristicName,
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

type CharacterCharacteristicDeleteParams = {
  characterCharacteristicId: string;
};

// @route DELETE http://localhost:3500/characterCharacteristics/:characterCharacteristicId
// @access Private
export const characterCharacteristicDeleteController: RequestHandler<
  CharacterCharacteristicDeleteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic = await characterCharacteristicDeleteService({
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
