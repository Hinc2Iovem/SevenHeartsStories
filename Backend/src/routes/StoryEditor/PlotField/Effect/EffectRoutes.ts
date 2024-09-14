import express from "express";
import {
  createEffectController,
  deleteEffectController,
  getEffectByPlotFieldCommandIdController,
  updateEffectController,
  createEffectDuplicateController,
} from "../../../../controllers/StoryEditor/PlotField/Effect/EffectController";

// Default route === /plotFieldCommands
export const effectsRoute = express.Router();

effectsRoute
  .route("/:plotFieldCommandId/effects")
  .get(getEffectByPlotFieldCommandIdController)
  .post(createEffectController);

effectsRoute
  .route("/effects/topologyBlocks/:topologyBlockId/copy")
  .post(createEffectDuplicateController);

effectsRoute
  .route("/effects/:effectId")
  .patch(updateEffectController)
  .delete(deleteEffectController);
