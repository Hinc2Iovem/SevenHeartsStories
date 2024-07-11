import express from "express";
import {
  characterCreateController,
  characterDeleteController,
  characterGetAllByStoryIdAndTypeController,
  characterGetAllByStoryIdController,
  characterGetByStoryIdAndNameController,
  characterUpdateController,
  characterUpdateImgController,
  getAllCharacterNameTagsController,
  getSingleCharacterByIdController,
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
  .get(characterGetAllByStoryIdController)
  .post(characterCreateController);

characterRoute
  .route("/stories/:storyId/type")
  .get(characterGetAllByStoryIdAndTypeController);

characterRoute.route("/:characterId/img").patch(characterUpdateImgController);

characterRoute
  .route("/:characterId")
  .get(getSingleCharacterByIdController)
  .patch(characterUpdateController)
  .delete(characterDeleteController);
