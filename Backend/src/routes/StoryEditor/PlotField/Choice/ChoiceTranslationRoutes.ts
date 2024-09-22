import express from "express";
import {
  getChoiceTranslationByCommandIdController,
  createChoiceTranslationController,
  choiceUpdateTranslationController,
  getAllChoicesTranslationByTopologyBlockIdController,
  getChoiceTranslationUpdatedAtAndLanguageController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceTranslationController";

// Default route === /choices
export const choiceTranslationsRoute = express.Router();

choiceTranslationsRoute
  .route("/paginated/recent/translations")
  .get(getChoiceTranslationUpdatedAtAndLanguageController);

choiceTranslationsRoute
  .route("/:plotFieldCommandId/translations")
  .get(getChoiceTranslationByCommandIdController);

choiceTranslationsRoute
  .route("/:plotFieldCommandId/topologyBlocks/:topologyBlockId/translations")
  .post(createChoiceTranslationController)
  .patch(choiceUpdateTranslationController);

choiceTranslationsRoute
  .route("/topologyBlocks/:topologyBlockId/translations")
  .get(getAllChoicesTranslationByTopologyBlockIdController);
