import express from "express";
import {
  getAllPlotFieldCommandsController,
  plotFieldCommandControllerCreate,
  plotFieldCommandControllerDelete,
  plotFieldCommandControllerUpdateCommandName,
  plotFieldCommandControllerUpdateCommandOrder,
} from "../../../controllers/StoryEditor/PlotField/PlotFieldCommandController";

// Default route === /plotField
export const plotFieldCommandRoute = express.Router();

plotFieldCommandRoute
  .route("/topologyBlocks/:topologyBlockId")
  .get(getAllPlotFieldCommandsController)
  .post(plotFieldCommandControllerCreate);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/topologyBlocks/commandName")
  .patch(plotFieldCommandControllerUpdateCommandName);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/topologyBlocks/commandOrder")
  .patch(plotFieldCommandControllerUpdateCommandOrder);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/topologyBlocks")
  .delete(plotFieldCommandControllerDelete);
