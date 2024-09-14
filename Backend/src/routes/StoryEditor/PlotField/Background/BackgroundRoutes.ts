import express from "express";
import {
  createBackgroundController,
  getBackgroundByPlotFieldCommandIdController,
  updateBackgroundController,
  updateBackgroundImgController,
  updateBackgroundMusicIdController,
  createBackgroundDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Background/BackgroundController";

// Default route === /plotFieldCommands
export const backgroundRoute = express.Router();

backgroundRoute
  .route("/:plotFieldCommandId/backgrounds")
  .post(createBackgroundController)
  .get(getBackgroundByPlotFieldCommandIdController);

backgroundRoute
  .route("/backgrounds/:backgroundId")
  .patch(updateBackgroundController);

backgroundRoute
  .route("/stories/:storyId/backgrounds/:backgroundId/musicName")
  .patch(updateBackgroundMusicIdController);

backgroundRoute
  .route("/backgrounds/topologyBlocks/:topologyBlockId/copy")
  .post(createBackgroundDuplicateController);

backgroundRoute
  .route("/backgrounds/:backgroundId/img")
  .patch(updateBackgroundImgController);
