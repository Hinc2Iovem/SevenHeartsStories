import express from "express";
import {
  createChoiceController,
  deleteChoiceController,
  updateChoiceController,
} from "../../../../controllers/StoryEditor/Flowchart/Choice/ChoiceController";

// Default route === /flowchartCommands
export const choiceRoute = express.Router();

choiceRoute.route("/:flowchartCommandId/choices").post(createChoiceController);

choiceRoute
  .route("/choices/:choiceId")
  .patch(updateChoiceController)
  .delete(deleteChoiceController);
