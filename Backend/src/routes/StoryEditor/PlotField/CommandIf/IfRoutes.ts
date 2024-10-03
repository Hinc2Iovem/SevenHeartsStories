import express from "express";
import {
  createCommandIfController,
  deleteCommandIfController,
  getCommandIfByPlotFieldCommandIdController,
  updateCommandIfOrderController,
  createCommandIfDuplicateController,
  getCommandIdsAndOrdersByCommandIfIdController,
} from "../../../../controllers/StoryEditor/PlotField/CommandIf/IfController";

// Default route === /plotFieldCommands
export const ifRoute = express.Router();

ifRoute
  .route("/:plotFieldCommandId/ifs")
  .get(getCommandIfByPlotFieldCommandIdController);

ifRoute
  .route("/ifs/:commandIfId/checkOrder")
  .get(getCommandIdsAndOrdersByCommandIfIdController);

ifRoute
  .route("/ifs/topologyBlocks/:topologyBlockId/copy")
  .post(createCommandIfDuplicateController);

ifRoute.route("/:plotFieldCommandId/ifs").post(createCommandIfController);

ifRoute
  .route("/:plotFieldCommandId/ifs/:commandIfId/newOrder")
  .patch(updateCommandIfOrderController);

ifRoute.route("/ifs/:ifId").delete(deleteCommandIfController);
