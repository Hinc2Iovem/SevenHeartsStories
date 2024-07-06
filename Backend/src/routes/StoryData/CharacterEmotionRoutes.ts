import express from "express";
import {
  characterEmotionCreateController,
  characterEmotionDeleteController,
  characterEmotionGetByCharacterIdController,
  characterEmotionUpdateController,
  characterEmotionUpdateImgUrlController,
} from "../../controllers/StoryData/CharacterEmotionController";

// Default route === /characterEmotions
export const characterEmotionRoute = express.Router();

characterEmotionRoute
  .route("/characters/:characterId")
  .get(characterEmotionGetByCharacterIdController)
  .post(characterEmotionCreateController);

characterEmotionRoute
  .route("/:characterEmotionId")
  .patch(characterEmotionUpdateController)
  .delete(characterEmotionDeleteController);

characterEmotionRoute
  .route("/:characterEmotionId/img")
  .patch(characterEmotionUpdateImgUrlController);
