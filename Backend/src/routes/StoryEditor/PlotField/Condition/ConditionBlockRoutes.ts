import express from "express";
import {
  addAnotherBlockConditionController,
  getConditionBlocksByCommandConditionIdController,
  updateBlockConditionOrderOfExecutionController,
  updateBlockConditionTopologyBlockController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionBlockController";

// Default route === /commandConditions
export const conditionBlockRoute = express.Router();

conditionBlockRoute
  .route("/:commandConditionId/conditionBlocks")
  .get(getConditionBlocksByCommandConditionIdController);

conditionBlockRoute
  .route("/:commandConditionId/conditionBlocks")
  .post(addAnotherBlockConditionController);

conditionBlockRoute
  .route("/conditionBlocks/:conditionBlockId/topologyBlocks/:topologyBlockId")
  .patch(updateBlockConditionTopologyBlockController);

conditionBlockRoute
  .route("/conditionBlocks/:conditionBlockId/orderOfExecution")
  .patch(updateBlockConditionOrderOfExecutionController);
