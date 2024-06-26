import express from "express";
import {
  createGetItemController,
  deleteGetItemController,
  updateGetItemController,
} from "../../../../controllers/StoryEditor/PlotField/GetItem/GetItemController";

// Default route === /plotFieldCommands
export const getItemsRoute = express.Router();

getItemsRoute
  .route("/:plotFieldCommandId/getItems")
  .post(createGetItemController);
getItemsRoute
  .route("/getItems/:getItemId")
  .patch(updateGetItemController)
  .delete(deleteGetItemController);
