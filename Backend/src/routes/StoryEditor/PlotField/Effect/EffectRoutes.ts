import express from "express";
import {
  createEffectController,
  deleteEffectController,
  updateEffectController,
} from "../../../../controllers/StoryEditor/PlotField/Effect/EffectController";

// Default route === /plotFieldCommands
export const effectsRoute = express.Router();

effectsRoute.route("/:plotFieldCommandId/effects").post(createEffectController);
effectsRoute
  .route("/effects/:effectId")
  .patch(updateEffectController)
  .delete(deleteEffectController);
