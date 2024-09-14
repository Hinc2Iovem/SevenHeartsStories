import express from "express";
import {
  deleteGetItemController,
  getItemByPlotFieldCommandIdController,
  createGetItemDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/GetItem/GetItemController";

// Default route === /plotFieldCommands
export const getItemsRoute = express.Router();

getItemsRoute
  .route("/:plotFieldCommandId/getItems")
  .get(getItemByPlotFieldCommandIdController);

getItemsRoute
  .route("/getItems/topologyBlocks/:topologyBlockId/copy")
  .post(createGetItemDuplicateController);

getItemsRoute.route("/getItems/:getItemId").delete(deleteGetItemController);
