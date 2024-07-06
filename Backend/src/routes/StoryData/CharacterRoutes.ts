import express from "express";
import {
  characterCreateController,
  characterDeleteController,
  characterGetAllByStoryIdController,
  characterGetByStoryIdAndNameController,
  characterUpdateController,
  getAllCharacterNameTagsController,
} from "../../controllers/StoryData/CharacterController";

// Default route === /characters
export const characterRoute = express.Router();

characterRoute
  .route("/stories/:storyId/nameTag")
  .get(getAllCharacterNameTagsController);
characterRoute
  .route("/stories/:storyId/name")
  .get(characterGetByStoryIdAndNameController);
characterRoute
  .route("/stories/:storyId")
  .get(characterGetAllByStoryIdController);

characterRoute.route("/stories/:storyId").post(characterCreateController);

characterRoute
  .route("/:characterId")
  .patch(characterUpdateController)
  .delete(characterDeleteController);
