import express from "express";
import {
  sayTranslationByCommandIdController,
  createSayTranslationController,
  sayUpdateTranslationController,
  getAllSayTranslationByTopologyBlockIdController,
  getSayTranslationUpdatedAtAndLanguageController,
  createSayTranslationDuplicateController,
  createSayBlankTranslationController,
} from "../../../../controllers/StoryEditor/PlotField/Say/SayTranslationController";

// Default route === /says
export const sayTranslationsRoute = express.Router();

sayTranslationsRoute
  .route("/paginated/recent/translations")
  .get(getSayTranslationUpdatedAtAndLanguageController);

sayTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(sayTranslationByCommandIdController);

sayTranslationsRoute
  .route(
    "/:plotFieldCommandId/topologyBlocks/:topologyBlockId/blank/translations"
  )
  .post(createSayBlankTranslationController);

sayTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createSayTranslationController)
  .patch(sayUpdateTranslationController);

sayTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/copy")
  .post(createSayTranslationDuplicateController);

sayTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllSayTranslationByTopologyBlockIdController);
