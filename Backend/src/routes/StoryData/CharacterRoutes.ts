import express from "express";
import {
  characterCreateController,
  characterDeleteController,
  characterUpdateController,
  characterUpdateNameTagController,
} from "../../controllers/StoryData/CharacterController";

// Default route === /characters
export const characterRoute = express.Router();

characterRoute.route("/").get().post(characterCreateController);

characterRoute
  .route("/:characterId/nameTag")
  .patch(characterUpdateNameTagController);
characterRoute
  .route("/:characterId")
  .patch(characterUpdateController)
  .delete(characterDeleteController);
