import express from "express";
import {
  getItemTranslationByCommandIdController,
  createGetItemTranslationController,
  getItemUpdateTranslationController,
  getAllItemTranslationByTopologyBlockIdController,
} from "../../../../controllers/StoryEditor/PlotField/GetItem/GetItemTranslationController";

// Default route === /getItems
export const getItemTranslationsRoute = express.Router();

getItemTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(getItemTranslationByCommandIdController);

getItemTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createGetItemTranslationController)
  .patch(getItemUpdateTranslationController);

getItemTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllItemTranslationByTopologyBlockIdController);
