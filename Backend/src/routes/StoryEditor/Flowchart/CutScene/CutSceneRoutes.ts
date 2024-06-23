import express from "express";
import {
  createCutSceneController,
  deleteCutSceneController,
  updateCutSceneController,
} from "../../../../controllers/StoryEditor/Flowchart/CutScene/CutSceneController";

// Default route === /flowchartCommands
export const cutScenesRoute = express.Router();

cutScenesRoute
  .route("/:flowchartCommandId/cutScenes")
  .post(createCutSceneController);
cutScenesRoute
  .route("/cutScenes/:cutSceneId")
  .patch(updateCutSceneController)
  .delete(deleteCutSceneController);
