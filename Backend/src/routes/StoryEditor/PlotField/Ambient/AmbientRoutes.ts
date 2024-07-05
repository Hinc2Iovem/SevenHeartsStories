import express from "express";
import {
  createAmbientController,
  deleteAmbientController,
  getAmbientByPlotFieldCommandIdController,
  updateAmbientController,
} from "../../../../controllers/StoryEditor/PlotField/Ambient/AmbientController";

// Default route === /plotFieldCommands
export const ambientRoute = express.Router();

ambientRoute
  .route("/:plotFieldCommandId/ambients")
  .post(createAmbientController)
  .get(getAmbientByPlotFieldCommandIdController);

ambientRoute
  .route("/ambients/:ambientId")
  .patch(updateAmbientController)
  .delete(deleteAmbientController);
