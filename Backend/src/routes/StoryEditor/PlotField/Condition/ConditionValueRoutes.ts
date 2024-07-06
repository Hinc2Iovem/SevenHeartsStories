import express from "express";
import {
  createConditionValueController,
  deleteConditionValueController,
  getConditionValueByConditionIdController,
  updateConditionValueController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionValueController";

// Default route === /plotFieldCommands
export const conditionValuesRoute = express.Router();

conditionValuesRoute
  .route("/conditions/:conditionId/conditionValues")
  .delete(getConditionValueByConditionIdController);

conditionValuesRoute
  .route("/conditions/:conditionId/conditionValues")
  .post(createConditionValueController);
conditionValuesRoute
  .route("/conditions/conditionValues/:conditionValueId")
  .patch(updateConditionValueController);

conditionValuesRoute
  .route("/conditions/conditionValues/:conditionValueId")
  .delete(deleteConditionValueController);
