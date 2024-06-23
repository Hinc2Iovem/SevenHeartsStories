import express from "express";
import {
  createAmbientController,
  deleteAmbientController,
  updateAmbientController,
} from "../../../../controllers/StoryEditor/Flowchart/Ambient/AmbientController";

// Default route === /flowchartCommands
export const ambientRoute = express.Router();

ambientRoute
  .route("/:flowchartCommandId/ambients")
  .post(createAmbientController);

ambientRoute
  .route("/ambients/:ambientId")
  .patch(updateAmbientController)
  .delete(deleteAmbientController);
