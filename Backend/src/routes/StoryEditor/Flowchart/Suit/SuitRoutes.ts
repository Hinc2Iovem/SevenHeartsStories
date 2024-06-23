import express from "express";
import {
  createSuitController,
  deleteSuitController,
  updateSuitController,
} from "../../../../controllers/StoryEditor/Flowchart/Suit/SuitController";

// Default route === /flowchartCommands
export const suitRoute = express.Router();

suitRoute.route("/:flowchartCommandId/suits").post(createSuitController);
suitRoute
  .route("/suits/:suitId")
  .patch(updateSuitController)
  .delete(deleteSuitController);
