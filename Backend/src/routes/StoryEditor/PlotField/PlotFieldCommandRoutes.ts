import express from "express";
import {
  plotFieldCommandControllerCreate,
  plotFieldCommandControllerDelete,
  plotFieldCommandControllerUpdateCommandName,
  plotFieldCommandControllerUpdateCommandOrder,
} from "../../../controllers/StoryEditor/PlotField/PlotFieldCommandController";

// Default route === /plotFieldCommands
export const plotFieldCommandRoute = express.Router();

plotFieldCommandRoute
  .route("/plotField/:plotFieldId")
  .post(plotFieldCommandControllerCreate);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/commandName")
  .patch(plotFieldCommandControllerUpdateCommandName);
plotFieldCommandRoute
  .route("/:plotFieldCommandId/commandOrder")
  .patch(plotFieldCommandControllerUpdateCommandOrder);
plotFieldCommandRoute
  .route("/:plotFieldCommandId")
  .delete(plotFieldCommandControllerDelete);
