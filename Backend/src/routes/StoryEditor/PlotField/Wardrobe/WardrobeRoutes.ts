import express from "express";
import {
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
  .route("/wardrobes/:commandWardrobeId")
  .delete(deleteCommandWardrobeController);

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId/appearanceParts/:appearancePartId")
  .patch(updateCommandWardrobeController);
