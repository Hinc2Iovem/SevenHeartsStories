import express from "express";
import {
  createCutSceneController,
  deleteCutSceneController,
  getCutSceneByPlotFieldCommandIdController,
  updateCutSceneController,
  createCutSceneDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/CutScene/CutSceneController";

// Default route === /plotFieldCommands
export const cutScenesRoute = express.Router();

cutScenesRoute
  .route("/:plotFieldCommandId/cutScenes")
  .post(createCutSceneController)
  .get(getCutSceneByPlotFieldCommandIdController);

cutScenesRoute
  .route("/cutScenes/topologyBlocks/:topologyBlockId/copy")
  .post(createCutSceneDuplicateController);

cutScenesRoute
  .route("/cutScenes/:cutSceneId")
  .patch(updateCutSceneController)
  .delete(deleteCutSceneController);
