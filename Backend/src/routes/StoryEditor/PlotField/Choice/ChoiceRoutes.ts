import express from "express";
import {
  createChoiceDuplicateController,
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

choiceRoute
  .route("/choices/:choiceId")
  .patch(updateChoiceController)
  .delete(deleteChoiceController);

choiceRoute
  .route("/choices/:choiceId/isAuthor")
  .patch(updateChoiceIsAuthorController);

choiceRoute
  .route("/choices/topologyBlocks/:topologyBlockId/copy")
  .post(createChoiceDuplicateController);

choiceRoute.route("/choices/:choiceId/type").patch(updateChoiceTypeController);
