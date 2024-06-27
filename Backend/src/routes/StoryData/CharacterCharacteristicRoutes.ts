import express from "express";
import {
  characterCharacteristicCreateController,
  characterCharacteristicDeleteController,
  characterCharacteristicUpdateController,
} from "../../controllers/StoryData/CharacterCharacteristicController";

// Default route === /characterCharacteristics
export const characterCharacteristicRoute = express.Router();

characterCharacteristicRoute
  .route("/")
  .post(characterCharacteristicCreateController);
characterCharacteristicRoute
  .route("/:characterCharacteristicId")
  .patch(characterCharacteristicUpdateController)
  .delete(characterCharacteristicDeleteController);
