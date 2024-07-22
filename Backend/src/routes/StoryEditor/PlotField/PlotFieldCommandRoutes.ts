import express from "express";
import {
  getAllPlotFieldCommandsByIfIdController,
  getAllPlotFieldCommandsController,
  plotFieldCommandControllerCreate,
  plotFieldCommandControllerDelete,
  plotFieldCommandControllerUpdateCommandName,
  plotFieldCommandControllerUpdateCommandOrder,
  plotFieldCommandCreateInsideIfBlockController,
  getAllPlotFieldCommandsByIfIdInsideElseController,
} from "../../../controllers/StoryEditor/PlotField/PlotFieldCommandController";

// Default route === /plotField
export const plotFieldCommandRoute = express.Router();

plotFieldCommandRoute
  .route("/commandIfs/:commandIfId/insideIf")
  .get(getAllPlotFieldCommandsByIfIdController);
plotFieldCommandRoute
  .route("/commandIfs/:commandIfId/insideElse")
  .get(getAllPlotFieldCommandsByIfIdInsideElseController);

plotFieldCommandRoute
  .route("/topologyBlocks/:topologyBlockId")
  .get(getAllPlotFieldCommandsController)
  .post(plotFieldCommandControllerCreate);

plotFieldCommandRoute
  .route("/topologyBlocks/:topologyBlockId/commandIfs/:commandIfId")
  .post(plotFieldCommandCreateInsideIfBlockController);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/topologyBlocks/commandName")
  .patch(plotFieldCommandControllerUpdateCommandName);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/topologyBlocks/commandOrder")
  .patch(plotFieldCommandControllerUpdateCommandOrder);

plotFieldCommandRoute
  .route("/:plotFieldCommandId/topologyBlocks")
  .delete(plotFieldCommandControllerDelete);
