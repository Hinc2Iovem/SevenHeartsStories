import express from "express";
import {
  characterCharacteristicCreateController,
  characterCharacteristicDeleteController,
  getAllCharacterCharacteristicsByStoryIdController,
  getAllCharacterCharacteristicController,
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
  .get(getAllCharacterCharacteristicController);

characterCharacteristicRoute
  .route("/stories/:storyId")
  .get(getAllCharacterCharacteristicsByStoryIdController)
  .post(characterCharacteristicCreateController);
