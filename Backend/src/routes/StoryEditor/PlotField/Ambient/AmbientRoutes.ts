import express from "express";
import {
  createAmbientController,
  deleteAmbientController,
  getAmbientByPlotFieldCommandIdController,
  updateAmbientController,
  createAmbientDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Ambient/AmbientController";

// Default route === /plotFieldCommands
export const ambientRoute = express.Router();

ambientRoute
  .route("/:plotFieldCommandId/ambients")
  .post(createAmbientController)
  .get(getAmbientByPlotFieldCommandIdController);

ambientRoute
  .route("/ambients/topologyBlocks/:topologyBlockId/copy")
  .post(createAmbientDuplicateController);

ambientRoute
  .route("/ambients/:ambientId")
  .patch(updateAmbientController)
  .delete(deleteAmbientController);
