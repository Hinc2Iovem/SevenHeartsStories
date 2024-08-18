import express from "express";
import {
  commandWardrobeTranslationByCommandIdController,
  createCommandWardrobeTranslationController,
  commandWardrobeUpdateTranslationController,
  getAllCommandWardrobesTranslationByTopologyBlockIdController,
} from "../../../../controllers/StoryEditor/PlotField/Wardrobe/CommandWardrobeTranslationController";

// Default route === /commandWardrobes
export const commandWardrobeTranslationsRoute = express.Router();

commandWardrobeTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(commandWardrobeTranslationByCommandIdController);

commandWardrobeTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createCommandWardrobeTranslationController)
  .patch(commandWardrobeUpdateTranslationController);

commandWardrobeTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllCommandWardrobesTranslationByTopologyBlockIdController);
