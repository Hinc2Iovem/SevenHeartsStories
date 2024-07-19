import express from "express";
import {
  createConditionValueController,
  deleteConditionValueController,
  getConditionValueByConditionBlockIdController,
  updateConditionValueController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionValueController";

// Default route === /plotFieldCommands
export const conditionValuesRoute = express.Router();

conditionValuesRoute
  .route("/conditionBlocks/:conditionBlockId/conditionValues")
  .get(getConditionValueByConditionBlockIdController);

conditionValuesRoute
  .route("/conditionBlocks/:conditionBlockId/conditionValues")
  .post(createConditionValueController);

conditionValuesRoute
  .route("/conditionBlocks/conditionValues/:conditionValueId")
  .patch(updateConditionValueController);

conditionValuesRoute
  .route("/conditionBlocks/conditionValues/:conditionValueId")
  .delete(deleteConditionValueController);
