import express from "express";
import {
  addAnotherBlockConditionController,
  getConditionBlocksByCommandConditionIdController,
  updateBlockConditionOrderOfExecutionController,
  updateBlockConditionTopologyBlockController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionBlockController";
import { createConditionBlockDuplicateController } from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionController";

// Default route === /commandConditions
export const conditionBlockRoute = express.Router();

conditionBlockRoute
  .route("/:commandConditionId/conditionBlocks")
  .get(getConditionBlocksByCommandConditionIdController);

conditionBlockRoute
  .route("/:commandConditionId/conditionBlocks")
  .post(addAnotherBlockConditionController);

conditionBlockRoute
  .route(
    "/conditionBlocks/:conditionBlockId/sourceBlocks/:sourceBlockId/targetBlocks/:targetBlockId"
  )
  .patch(updateBlockConditionTopologyBlockController);

conditionBlockRoute
  .route("/conditionBlocks/topologyBlocks/:topologyBlockId/copy")
  .post(createConditionBlockDuplicateController);

conditionBlockRoute
  .route("/conditionBlocks/:conditionBlockId/orderOfExecution")
  .patch(updateBlockConditionOrderOfExecutionController);
