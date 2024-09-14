import express from "express";
import {
  createCommandIfController,
  deleteCommandIfController,
  getCommandIfByPlotFieldCommandIdController,
  updateCommandIfOrderController,
  createCommandIfDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/CommandIf/IfController";

// Default route === /plotFieldCommands
export const ifRoute = express.Router();

ifRoute
  .route("/:plotFieldCommandId/ifs")
  .get(getCommandIfByPlotFieldCommandIdController);

ifRoute
  .route("/ifs/topologyBlocks/:topologyBlockId/copy")
  .post(createCommandIfDuplicateController);

ifRoute.route("/:plotFieldCommandId/ifs").post(createCommandIfController);
ifRoute
  .route("/:plotFieldCommandId/ifs/:commandIfId/newOrder")
  .patch(updateCommandIfOrderController);

ifRoute.route("/ifs/:ifId").delete(deleteCommandIfController);
