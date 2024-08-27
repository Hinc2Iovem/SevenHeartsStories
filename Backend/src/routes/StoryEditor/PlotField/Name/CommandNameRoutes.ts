import express from "express";
import {
  createNameController,
  deleteNameController,
  getNameByPlotFieldCommandIdController,
  updateNameController,
} from "../../../../controllers/StoryEditor/PlotField/Name/CommandNameController";

// Default route === /plotFieldCommands
export const commandNameRoute = express.Router();

commandNameRoute
  .route("/:plotFieldCommandId/names")
  .get(getNameByPlotFieldCommandIdController)
  .post(createNameController);

commandNameRoute.route("/characters/names/:nameId").patch(updateNameController);

commandNameRoute.route("names/:nameId").delete(deleteNameController);
