import express from "express";
import {
  deleteChoiceController,
  getChoiceByPlotFieldCommandIdController,
  updateChoiceController,
  updateChoiceIsAuthorController,
  updateChoiceTypeController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";

// Default route === /plotFieldCommands
export const choiceRoute = express.Router();

choiceRoute
  .route("/:plotFieldCommandId/choices")
  .get(getChoiceByPlotFieldCommandIdController);

choiceRoute.route("/choices/:choiceId").patch(updateChoiceController);

choiceRoute
  .route("/choices/:choiceId/isAuthor")
  .patch(updateChoiceIsAuthorController);
choiceRoute.route("/choices/:choiceId/type").patch(updateChoiceTypeController);

choiceRoute.route("/choices/:choiceId").delete(deleteChoiceController);
