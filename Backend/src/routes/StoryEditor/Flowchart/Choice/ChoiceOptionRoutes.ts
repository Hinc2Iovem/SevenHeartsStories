import express from "express";
import {
  createChoiceOptionController,
  deleteChoiceOptionController,
  updateChoiceOptionController,
} from "../../../../controllers/StoryEditor/Flowchart/Choice/ChoiceOptionController";

// Default route === /flowchartCommands
export const choiceOptionRoute = express.Router();

choiceOptionRoute
  .route("/:flowchartCommandId/choices/options/topologyBlocks/:topologyBlockId")
  .post(createChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .patch(updateChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .delete(deleteChoiceOptionController);
