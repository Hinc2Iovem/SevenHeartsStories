import express from "express";
import { characterEmotionCreateController } from "../../controllers/StoryData/CharacterEmotionController";

// Default route === /characterEmotions
export const characterEmotionRoute = express.Router();

characterEmotionRoute.route("/").post(characterEmotionCreateController);
