import express from "express";
import {
  flowchartCommandControllerCreate,
  flowchartCommandControllerDelete,
  flowchartCommandControllerUpdateCommandName,
  flowchartCommandControllerUpdateCommandOrder,
  flowchartCommandControllerUpdateCommandSide,
} from "../../../controllers/StoryEditor/Flowchart/FlowchartCommandController";

// Default route === /flowchartCommands
export const flowchartCommandRoute = express.Router();

flowchartCommandRoute
  .route("/flowchart/:flowchartId")
  .post(flowchartCommandControllerCreate);

flowchartCommandRoute
  .route("/:flowchartCommandId/commandSide")
  .patch(flowchartCommandControllerUpdateCommandSide);
flowchartCommandRoute
  .route("/:flowchartCommandId/commandName")
  .patch(flowchartCommandControllerUpdateCommandName);
flowchartCommandRoute
  .route("/:flowchartCommandId/commandOrder")
  .patch(flowchartCommandControllerUpdateCommandOrder);
flowchartCommandRoute
  .route("/:flowchartCommandId")
  .delete(flowchartCommandControllerDelete);
