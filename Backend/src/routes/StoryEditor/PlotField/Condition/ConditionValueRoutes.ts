import express from "express";
import {
  createConditionValueController,
  deleteConditionValueController,
  updateConditionValueController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionValueController";

// Default route === /plotFieldCommands
export const conditionValuesRoute = express.Router();

conditionValuesRoute
  .route("/conditions/:conditionId/conditionValues")
  .post(createConditionValueController);
conditionValuesRoute
  .route("/conditions/conditionValues/:conditionValueId")
  .patch(updateConditionValueController);

conditionValuesRoute
  .route("/conditions/conditionValues/:conditionId")
  .delete(deleteConditionValueController);
