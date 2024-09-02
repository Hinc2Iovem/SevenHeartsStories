import express from "express";
import {
  choiceOptionControllerUpdateSexualOrientation,
  createChoiceOptionController,
  deleteChoiceOptionController,
  getAllChoiceOptionsByChoiceIdController,
  getChoiceOptionByIdController,
  updateChoiceOptionController,
  updateChoiceOptionTopologyBlockController,
  choiceOptionControllerUpdateOptionOrder,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceOptionController";

// Default route === /plotFieldCommands
export const choiceOptionRoute = express.Router();

choiceOptionRoute
  .route("/choice/:plotFieldCommandChoiceId/options")
  .get(getAllChoiceOptionsByChoiceIdController);

choiceOptionRoute
  .route("/:plotFieldCommandId/choices/:plotFieldCommandChoiceId/options")
  .post(createChoiceOptionController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId")
  .patch(updateChoiceOptionController)
  .get(getChoiceOptionByIdController)
  .delete(deleteChoiceOptionController);

choiceOptionRoute
  .route(
    "/choices/options/:choiceOptionId/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId"
  )
  .patch(updateChoiceOptionTopologyBlockController);

choiceOptionRoute
  .route("/choices/options/:choiceOptionId/sexualOrientation")
  .patch(choiceOptionControllerUpdateSexualOrientation);

choiceOptionRoute
  .route("/choices/:choiceId/options/:choiceOptionId/optionOrder")
  .patch(choiceOptionControllerUpdateOptionOrder);
