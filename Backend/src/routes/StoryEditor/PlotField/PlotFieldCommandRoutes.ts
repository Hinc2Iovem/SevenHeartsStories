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
  .route("/plotField/topologyBlocks/:topologyBlockId")
  .get(getAllPlotFieldCommandsController)
  .post(plotFieldCommandControllerCreate);

plotFieldCommandRoute
  .route("/plotField/:plotFieldCommandId/topologyBlocks/commandName")
  .patch(plotFieldCommandControllerUpdateCommandName);

plotFieldCommandRoute
  .route("/plotField/:plotFieldCommandId/topologyBlocks/commandOrder")
  .patch(plotFieldCommandControllerUpdateCommandOrder);

plotFieldCommandRoute
  .route("/plotField/:plotFieldCommandId/topologyBlocks")
  .delete(plotFieldCommandControllerDelete);
