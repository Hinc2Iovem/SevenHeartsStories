import express from "express";
import {
  createConditionController,
  deleteConditionController,
  getConditionByPlotFieldCommandIdController,
} from "../../../../controllers/StoryEditor/PlotField/CommandIf/IfController";

// Default route === /plotFieldCommands
export const ifRoute = express.Router();

ifRoute
  .route("/:plotFieldCommandId/ifs")
  .get(getConditionByPlotFieldCommandIdController);

ifRoute.route("/:plotFieldCommandId/ifs").post(createConditionController);

// ifRoute
//   .route("/ifs/:commandIfId/addCondititon")
//   .post(addAnotherBlockConditionController);

ifRoute.route("/ifs/:ifId").delete(deleteConditionController);
