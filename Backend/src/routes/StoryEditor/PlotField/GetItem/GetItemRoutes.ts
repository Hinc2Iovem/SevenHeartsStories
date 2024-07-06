import express from "express";
import {
  createGetItemController,
  deleteGetItemController,
  getItemByPlotFieldCommandIdController,
} from "../../../../controllers/StoryEditor/PlotField/GetItem/GetItemController";

// Default route === /plotFieldCommands
export const getItemsRoute = express.Router();

getItemsRoute
  .route("/:plotFieldCommandId/getItems")
  .post(createGetItemController)
  .get(getItemByPlotFieldCommandIdController);

getItemsRoute.route("/getItems/:getItemId").delete(deleteGetItemController);
