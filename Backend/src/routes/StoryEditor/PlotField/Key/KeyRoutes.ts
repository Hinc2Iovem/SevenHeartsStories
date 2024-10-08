import express from "express";
import {
  createKeyController,
  deleteKeyController,
  getKeyByPlotFieldCommandIdController,
  getKeyByStoryIdController,
  updateKeyController,
  createKeyDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Key/KeyController";

// Default route === /plotFieldCommands
export const keyRoute = express.Router();

keyRoute
  .route("/:plotFieldCommandId/keys")
  .get(getKeyByPlotFieldCommandIdController);

keyRoute
  .route("/:plotFieldCommandId/stories/:storyId/keys")
  .post(createKeyController);

keyRoute
  .route("/keys/topologyBlocks/:topologyBlockId/copy")
  .post(createKeyDuplicateController);

keyRoute.route("/stories/:storyId/keys").get(getKeyByStoryIdController);

keyRoute.route("/commandKeys/:commandKeyId/text").patch(updateKeyController);

keyRoute.route("/commandKeys/:commandKeyId").delete(deleteKeyController);
