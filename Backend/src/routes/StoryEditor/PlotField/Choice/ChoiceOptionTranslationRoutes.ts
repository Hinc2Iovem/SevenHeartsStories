import express from "express";
import {
  getChoiceOptionTranslationByCommandIdController,
  choiceOptionUpdateTranslationController,
  getAllChoiceOptionsTranslationByChoiceIdController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceOptionTranslationController";

// Default route === /choiceOptions
export const choiceOptionTranslationsRoute = express.Router();

choiceOptionTranslationsRoute
  .route("/:choiceOptionId/translations")
  .get(getChoiceOptionTranslationByCommandIdController);

choiceOptionTranslationsRoute
  .route("/:choiceOptionId/choices/:choiceId/translations")
  .patch(choiceOptionUpdateTranslationController);

choiceOptionTranslationsRoute
  .route("/choices/:choiceId/translations")
  .get(getAllChoiceOptionsTranslationByChoiceIdController);
