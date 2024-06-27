import express from "express";
import {
  createCommandWardrobeAppearancePartController,
  createCommandWardrobeController,
  deleteCommandWardrobeController,
  updateCommandWardrobeController,
} from "../../../../controllers/StoryEditor/PlotField/Wardrobe/WardrobeController";

// Default route === /plotFieldCommands
export const wardrobeRoute = express.Router();

wardrobeRoute
  .route("/:plotFieldCommandId/wardrobes")
  .post(createCommandWardrobeController);

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId/appearanceParts/:appearancePartId")
  .post(createCommandWardrobeAppearancePartController);

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId/characters/:characterId")
  .patch(updateCommandWardrobeController);

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId")
  .delete(deleteCommandWardrobeController);
