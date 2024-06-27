import express from "express";
import {
  createKeyController,
  deleteKeyController,
  updateKeyController,
  updateKeyTargetBlockIdController,
} from "../../../../controllers/StoryEditor/PlotField/Key/KeyController";

// Default route === /plotFieldCommands
export const keyRoute = express.Router();

keyRoute.route("/:plotFieldCommandId/keys").post(createKeyController);

keyRoute
  .route("/commandKeys/:commandKeyId/targetBlocks/:targetBlockId")
  .patch(updateKeyController);
keyRoute
  .route(
    "/commandKeys/:commandKeyId/targetBlocks/:newTargetBlockId/assingNewBlock"
  )
  .patch(updateKeyTargetBlockIdController);
keyRoute.route("/commandKeys/:commandKeyId").delete(deleteKeyController);
