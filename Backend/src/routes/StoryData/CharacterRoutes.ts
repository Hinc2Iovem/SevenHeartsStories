import express from "express";
import {
  characterCreateController,
  characterDeleteController,
  characterUpdateController,
  characterUpdateImgController,
  characterUpdateNameTagController,
} from "../../controllers/StoryData/CharacterController";

// Default route === /characters
export const characterRoute = express.Router();

characterRoute.route("/stories/:storyId").post(characterCreateController);

characterRoute
  .route("/:characterId/nameTag")
  .patch(characterUpdateNameTagController);
characterRoute.route("/:characterId/img").patch(characterUpdateImgController);
characterRoute
  .route("/:characterId")
  .patch(characterUpdateController)
  .delete(characterDeleteController);
