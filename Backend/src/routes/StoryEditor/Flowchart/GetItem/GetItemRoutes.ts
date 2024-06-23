import express from "express";
import {
  createGetItemController,
  deleteGetItemController,
  updateGetItemController,
} from "../../../../controllers/StoryEditor/Flowchart/GetItem/GetItemController";

// Default route === /flowchartCommands
export const getItemsRoute = express.Router();

getItemsRoute
  .route("/:flowchartCommandId/getItems")
  .post(createGetItemController);
getItemsRoute
  .route("/getItems/:getItemId")
  .patch(updateGetItemController)
  .delete(deleteGetItemController);
