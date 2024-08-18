import express from "express";
import {
  sayTranslationByCommandIdController,
  createSayTranslationController,
  sayUpdateTranslationController,
  getAllSayTranslationByTopologyBlockIdController,
} from "../../../../controllers/StoryEditor/PlotField/Say/SayTranslationController";

// Default route === /says
export const sayTranslationsRoute = express.Router();

sayTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(sayTranslationByCommandIdController);

sayTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createSayTranslationController)
  .patch(sayUpdateTranslationController);

sayTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllSayTranslationByTopologyBlockIdController);
