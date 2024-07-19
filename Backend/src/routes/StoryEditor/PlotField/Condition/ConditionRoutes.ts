import express from "express";
import {
  createConditionController,
  deleteConditionController,
  getConditionByPlotFieldCommandIdController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionController";

// Default route === /plotFieldCommands
export const conditionRoute = express.Router();

conditionRoute
  .route("/:plotFieldCommandId/conditions")
  .get(getConditionByPlotFieldCommandIdController);

conditionRoute
  .route("/:plotFieldCommandId/conditions")
  .post(createConditionController);

conditionRoute
  .route("/conditions/:conditionId")
  .delete(deleteConditionController);
