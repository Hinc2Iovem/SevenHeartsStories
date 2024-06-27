import express from "express";
import {
  createChoiceController,
  deleteChoiceController,
  updateChoiceController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";

// Default route === /plotFieldCommands
export const choiceRoute = express.Router();

choiceRoute.route("/:plotFieldCommandId/choices").post(createChoiceController);

choiceRoute
  .route("/choices/:choiceId/exitBlocks/:exitBlockId")
  .patch(updateChoiceController);
choiceRoute.route("/choices/:choiceId").delete(deleteChoiceController);
