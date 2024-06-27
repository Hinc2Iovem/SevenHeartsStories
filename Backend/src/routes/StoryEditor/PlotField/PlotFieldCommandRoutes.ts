import express from "express";
import {
  getAllPlotFieldCommandsController,
  plotFieldCommandControllerCreate,
  plotFieldCommandControllerDelete,
  plotFieldCommandControllerUpdateCommandName,
  plotFieldCommandControllerUpdateCommandOrder,
} from "../../../controllers/StoryEditor/PlotField/PlotFieldCommandController";

// Default route === /topologyBlocks
export const plotFieldCommandRoute = express.Router();

plotFieldCommandRoute
  .route("/:topologyBlockId")
  .get(getAllPlotFieldCommandsController)
  .post(plotFieldCommandControllerCreate);

plotFieldCommandRoute
  .route("/plotFieldCommands/:plotFieldCommandId/commandName")
  .patch(plotFieldCommandControllerUpdateCommandName);
plotFieldCommandRoute
  .route("/plotFieldCommands/:plotFieldCommandId/commandOrder")
  .patch(plotFieldCommandControllerUpdateCommandOrder);
plotFieldCommandRoute
  .route("/plotFieldCommands/:plotFieldCommandId")
  .delete(plotFieldCommandControllerDelete);
