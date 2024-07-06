import express from "express";
import {
  createIfValueController,
  deleteIfValueController,
  updateIfValueController,
  getIfValueByIfIdController,
} from "../../../../controllers/StoryEditor/PlotField/CommandIf/IfValueController";

// Default route === /plotFieldCommands
export const ifValuesRoute = express.Router();

ifValuesRoute
  .route("/ifs/:ifId/ifValues")
  .get(getIfValueByIfIdController)
  .post(createIfValueController);

ifValuesRoute
  .route("/ifs/ifValues/:ifValueId")
  .patch(updateIfValueController)
  .delete(deleteIfValueController);
