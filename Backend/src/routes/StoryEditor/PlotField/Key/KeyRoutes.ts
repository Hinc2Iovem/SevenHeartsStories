import express from "express";
import {
  createKeyController,
  deleteKeyController,
  getKeyByPlotFieldCommandIdController,
  updateKeyController,
} from "../../../../controllers/StoryEditor/PlotField/Key/KeyController";

// Default route === /plotFieldCommands
export const keyRoute = express.Router();

keyRoute
  .route("/:plotFieldCommandId/keys")
  .get(getKeyByPlotFieldCommandIdController)
  .post(createKeyController);

keyRoute
  .route("/commandKeys/:commandKeyId/targetBlocks/:targetBlockId")
  .patch(updateKeyController);

keyRoute.route("/commandKeys/:commandKeyId").delete(deleteKeyController);
