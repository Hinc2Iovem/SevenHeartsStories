import express from "express";
import {
  choiceOptionControllerUpdateSexualOrientation,
  createChoiceOptionController,
  deleteChoiceOptionController,
  getChoiceOptionByPlotFieldCommandChoiceIdController,
  updateChoiceOptionController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceOptionController";

// Default route === /plotFieldCommands
export const choiceOptionRoute = express.Router();

choiceOptionRoute
  .route("/choice/:plotFieldCommandChoiceId/options")
  .get(getChoiceOptionByPlotFieldCommandChoiceIdController);

choiceOptionRoute
  .route(
    "/:plotFieldCommandId/choices/options/episodes/:episodeId/topologyBlocks/:topologyBlockId"
  )
  .post(createChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .patch(updateChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId/sexualOrientation")
  .patch(choiceOptionControllerUpdateSexualOrientation);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .delete(deleteChoiceOptionController);
