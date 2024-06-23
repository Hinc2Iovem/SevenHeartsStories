import express from "express";
import {
  addAnotherBlockConditionController,
  createConditionController,
  deleteConditionController,
} from "../../../../controllers/StoryEditor/Flowchart/Condition/ConditionController";

// Default route === /flowchartCommands
export const conditionRoute = express.Router();

conditionRoute
  .route("/:flowchartCommandId/conditions/targetBlocks/:targetBlockId")
  .post(createConditionController);
conditionRoute
  .route("/:flowchartCommandId/conditions/targetBlocks/:targetBlockId/addBlock")
  .post(addAnotherBlockConditionController);

conditionRoute
  .route("/conditions/:conditionId")
  .delete(deleteConditionController);
