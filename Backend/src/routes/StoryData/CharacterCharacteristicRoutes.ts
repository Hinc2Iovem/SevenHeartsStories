import express from "express";
import {
  characterCharacteristicCreateController,
  characterCharacteristicDeleteController,
  characterCharacteristicGetByCharacterIdController,
} from "../../controllers/StoryData/CharacterCharacteristicController";

// Default route === /characterCharacteristics
export const characterCharacteristicRoute = express.Router();

characterCharacteristicRoute
  .route("/characters/:characterId")
  .get(characterCharacteristicGetByCharacterIdController);

characterCharacteristicRoute
  .route("/")
  .post(characterCharacteristicCreateController);

characterCharacteristicRoute
  .route("/:characterCharacteristicId")
  .delete(characterCharacteristicDeleteController);
