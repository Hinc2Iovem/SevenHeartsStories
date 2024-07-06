import express from "express";
import {
  createConditionController,
  getConditionByPlotFieldCommandIdController,
  addAnotherBlockConditionController,
  deleteConditionController,
} from "../../../../controllers/StoryEditor/PlotField/CommandIf/IfController";

// Default route === /plotFieldCommands
export const ifRoute = express.Router();

ifRoute
  .route("/:plotFieldCommandId/ifs")
  .get(getConditionByPlotFieldCommandIdController);

ifRoute.route("/:plotFieldCommandId/ifs").post(createConditionController);
ifRoute
  .route("/:plotFieldCommandId/ifs/addCondititon")
  .post(addAnotherBlockConditionController);

ifRoute.route("/ifs/:ifId").delete(deleteConditionController);
