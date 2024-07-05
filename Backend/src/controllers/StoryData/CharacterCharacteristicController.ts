import { RequestHandler } from "express";
import {
  characterCharacteristicDeleteService,
  characterCharacteristicCreateService,
  characterCharacteristicGetByCharacterIdService,
} from "../../services/StoryData/CharacterCharacteristicService";

type CharacterCharacteristicGetByCharacterIdParams = {
  characterId: string;
};

// @route GET http://localhost:3500/characterCharacteristics/characters/:characterId
// @access Private
export const characterCharacteristicGetByCharacterIdController: RequestHandler<
  CharacterCharacteristicGetByCharacterIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic =
      await characterCharacteristicGetByCharacterIdService({
        characterId: req.params.characterId,
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
type CharacterCharacteristicCreateParams = {
  characterId: string;
};

type CharacterCharacteristicCreateBody = {
  characteristicName: string | undefined;
  currentLanguage: string | undefined;
};

// @route POST http://localhost:3500/characterCharacteristics
// @access Private
export const characterCharacteristicCreateController: RequestHandler<
  CharacterCharacteristicCreateParams,
  unknown,
  CharacterCharacteristicCreateBody,
  unknown
> = async (req, res, next) => {
  try {
    const characterCharacteristic = await characterCharacteristicCreateService({
      characterId: req.params.characterId,
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
  characteristicId: string | undefined;
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
      characteristicId: req.params.characteristicId,
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
