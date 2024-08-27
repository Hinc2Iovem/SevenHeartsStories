import express from "express";
import {
  characterDeleteController,
  characterGetAllByStoryIdAndTypeController,
  characterGetAllByStoryIdController,
  characterUpdateController,
  characterUpdateImgController,
  getAllCharacterNameTagsController,
  getSingleCharacterByIdController,
} from "../../../controllers/StoryData/Character/CharacterController";

// Default route === /characters
export const characterRoute = express.Router();

characterRoute
  .route("/stories/:storyId/nameTag")
  .get(getAllCharacterNameTagsController);

characterRoute
  .route("/stories/:storyId")
  .get(characterGetAllByStoryIdController);

characterRoute
  .route("/stories/:storyId/type")
  .get(characterGetAllByStoryIdAndTypeController);

characterRoute.route("/:characterId/img").patch(characterUpdateImgController);

characterRoute
  .route("/:characterId")
  .get(getSingleCharacterByIdController)
  .patch(characterUpdateController)
  .delete(characterDeleteController);
