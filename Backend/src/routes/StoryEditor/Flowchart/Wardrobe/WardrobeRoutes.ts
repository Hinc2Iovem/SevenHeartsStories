import express from "express";
import {
  createCommandWardrobeController,
  deleteCommandWardrobeController,
  updateCommandWardrobeController,
} from "../../../../controllers/StoryEditor/Flowchart/Wardrobe/WardrobeController";

// Default route === /flowchartCommands
export const wardrobeRoute = express.Router();

wardrobeRoute
  .route("/:flowchartCommandId/wardrobes")
  .post(createCommandWardrobeController);
wardrobeRoute
  .route("/wardrobes/:commandWardrobeId")
  .delete(deleteCommandWardrobeController);

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId/appearanceParts/:appearancePartId")
  .patch(updateCommandWardrobeController);
