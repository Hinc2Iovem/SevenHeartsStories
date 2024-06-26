import express from "express";
import {
  addAnotherBlockConditionController,
  createConditionController,
  deleteConditionController,
} from "../../../../controllers/StoryEditor/PlotField/Condition/ConditionController";

// Default route === /plotFieldCommands
export const conditionRoute = express.Router();

conditionRoute
  .route("/:plotFieldCommandId/conditions/targetBlocks/:targetBlockId")
  .post(createConditionController);
conditionRoute
  .route("/:plotFieldCommandId/conditions/targetBlocks/:targetBlockId/addBlock")
  .post(addAnotherBlockConditionController);

conditionRoute
  .route("/conditions/:conditionId")
  .delete(deleteConditionController);
