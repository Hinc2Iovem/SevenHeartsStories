import express from "express";
import {
  commandWardrobeTranslationByCommandIdController,
  createCommandWardrobeTranslationController,
  commandWardrobeUpdateTranslationController,
  getAllCommandWardrobesTranslationByTopologyBlockIdController,
  getCommandWardrobeTranslationUpdatedAtAndLanguageController,
  createCommandWardrobeTranslationDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Wardrobe/CommandWardrobeTranslationController";

// Default route === /commandWardrobes
export const commandWardrobeTranslationsRoute = express.Router();

commandWardrobeTranslationsRoute
  .route("/recent/translations")
  .get(getCommandWardrobeTranslationUpdatedAtAndLanguageController);

commandWardrobeTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(commandWardrobeTranslationByCommandIdController);

commandWardrobeTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createCommandWardrobeTranslationController)
  .patch(commandWardrobeUpdateTranslationController);

commandWardrobeTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/copy")
  .post(createCommandWardrobeTranslationDuplicateController);

commandWardrobeTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllCommandWardrobesTranslationByTopologyBlockIdController);
