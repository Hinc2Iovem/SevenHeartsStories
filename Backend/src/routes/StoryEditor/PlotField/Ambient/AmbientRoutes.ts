import express from "express";
import {
  createAmbientController,
  deleteAmbientController,
  updateAmbientController,
} from "../../../../controllers/StoryEditor/PlotField/Ambient/AmbientController";

// Default route === /plotFieldCommands
export const ambientRoute = express.Router();

ambientRoute
  .route("/:plotFieldCommandId/ambients")
  .post(createAmbientController);

ambientRoute
  .route("/ambients/:ambientId")
  .patch(updateAmbientController)
  .delete(deleteAmbientController);
