import express from "express";
import {
  createChoiceOptionController,
  deleteChoiceOptionController,
  updateChoiceOptionController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceOptionController";

// Default route === /plotFieldCommands
export const choiceOptionRoute = express.Router();

choiceOptionRoute
  .route(
    "/:plotFieldCommandId/episodes/:episodeId/choices/options/topologyBlocks/:topologyBlockId"
  )
  .post(createChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .patch(updateChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .delete(deleteChoiceOptionController);
