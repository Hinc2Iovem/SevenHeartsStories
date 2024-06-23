import express from "express";
import {
  createEffectController,
  deleteEffectController,
  updateEffectController,
} from "../../../../controllers/StoryEditor/Flowchart/Effect/EffectController";

// Default route === /flowchartCommands
export const effectsRoute = express.Router();

effectsRoute.route("/:flowchartCommandId/effects").post(createEffectController);
effectsRoute
  .route("/effects/:effectId")
  .patch(updateEffectController)
  .delete(deleteEffectController);
