import express from "express";
import {
  characterCharacteristicCreateController,
  characterCharacteristicDeleteController,
  characterCharacteristicGetByCharacterIdController,
  characterCharacteristicGetByIdController,
} from "../../controllers/StoryData/CharacterCharacteristicController";

// Default route === /characterCharacteristics
export const characterCharacteristicRoute = express.Router();

characterCharacteristicRoute
  .route("/:characterCharacteristicId")
  .get(characterCharacteristicGetByIdController)
  .delete(characterCharacteristicDeleteController);

characterCharacteristicRoute
  .route("/")
  .get(characterCharacteristicGetByCharacterIdController)
  .post(characterCharacteristicCreateController);
