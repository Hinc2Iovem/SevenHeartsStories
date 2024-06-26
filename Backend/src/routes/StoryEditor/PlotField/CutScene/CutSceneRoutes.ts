import express from "express";
import {
  createCutSceneController,
  deleteCutSceneController,
  updateCutSceneController,
} from "../../../../controllers/StoryEditor/PlotField/CutScene/CutSceneController";

// Default route === /plotFieldCommands
export const cutScenesRoute = express.Router();

cutScenesRoute
  .route("/:plotFieldCommandId/cutScenes")
  .post(createCutSceneController);
cutScenesRoute
  .route("/cutScenes/:cutSceneId")
  .patch(updateCutSceneController)
  .delete(deleteCutSceneController);
