import express from "express";
import {
  createChoiceController,
  deleteChoiceController,
  getChoiceByPlotFieldCommandIdController,
  updateChoiceController,
  updateChoiceTextController,
  updateChoiceTypeController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";

// Default route === /plotFieldCommands
export const choiceRoute = express.Router();

choiceRoute
  .route("/:plotFieldCommandId/choices")
  .get(getChoiceByPlotFieldCommandIdController)
  .post(createChoiceController);

choiceRoute.route("/choices/:choiceId").patch(updateChoiceController);

choiceRoute.route("/choices/:choiceId/text").patch(updateChoiceTextController);
choiceRoute.route("/choices/:choiceId/type").patch(updateChoiceTypeController);

choiceRoute.route("/choices/:choiceId").delete(deleteChoiceController);
