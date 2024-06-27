import express from "express";
import {
  createNameController,
  deleteNameController,
  updateNameController,
} from "../../../../controllers/StoryEditor/PlotField/Name/CommandNameController";

// Default route === /plotFieldCommands
export const commandNameRoute = express.Router();

commandNameRoute.route("/:plotFieldCommandId/names").post(createNameController);
commandNameRoute
  .route("/characters/:characterId/names/:nameId")
  .patch(updateNameController);
commandNameRoute.route("names/:nameId").delete(deleteNameController);
