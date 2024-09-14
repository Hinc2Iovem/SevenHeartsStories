import express from "express";
import {
  createSuitController,
  deleteSuitController,
  getSuitByPlotFieldCommandIdController,
  updateSuitController,
  createSuitDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Suit/SuitController";

// Default route === /plotFieldCommands
export const suitRoute = express.Router();

suitRoute
  .route("/:plotFieldCommandId/suits")
  .get(getSuitByPlotFieldCommandIdController)
  .post(createSuitController);

suitRoute
  .route("/suits/topologyBlocks/:topologyBlockId/copy")
  .post(createSuitDuplicateController);

suitRoute
  .route("/characters/:characterId/suits/:suitId")
  .patch(updateSuitController);

suitRoute.route("/suits/:suitId").delete(deleteSuitController);
