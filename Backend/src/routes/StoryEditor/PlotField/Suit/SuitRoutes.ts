import express from "express";
import {
  createSuitController,
  deleteSuitController,
  updateSuitController,
} from "../../../../controllers/StoryEditor/PlotField/Suit/SuitController";

// Default route === /plotFieldCommands
export const suitRoute = express.Router();

suitRoute.route("/:plotFieldCommandId/suits").post(createSuitController);
suitRoute
  .route("/characters/:characterId/suits/:suitId")
  .patch(updateSuitController);
suitRoute
  .route("/suits/:suitId")
  .patch(updateSuitController)
  .delete(deleteSuitController);
