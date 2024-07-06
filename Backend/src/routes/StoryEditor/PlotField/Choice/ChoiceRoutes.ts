import express from "express";
import {
  createChoiceController,
  deleteChoiceController,
  getChoiceByPlotFieldCommandIdController,
  updateChoiceController,
} from "../../../../controllers/StoryEditor/PlotField/Choice/ChoiceController";

// Default route === /plotFieldCommands
export const choiceRoute = express.Router();

choiceRoute
  .route("/:plotFieldCommandId/choices")
  .get(getChoiceByPlotFieldCommandIdController)
  .post(createChoiceController);

choiceRoute
  .route(
    "/choices/:choiceId/exitBlocks/:exitBlockId/characters/:characterId/characterEmotions/:characterEmotionId"
  )
  .patch(updateChoiceController);
choiceRoute.route("/choices/:choiceId").delete(deleteChoiceController);
