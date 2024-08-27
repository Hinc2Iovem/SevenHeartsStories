import express from "express";
import {
  createCommandWardrobeAppearancePartController,
  createCommandWardrobeController,
  deleteCommandWardrobeController,
  getCommandWardrobeByAppearancePartIdAndCommandWardrobeIdController,
  getCommandWardrobeByPlotFieldCommandIdController,
  updateCommandWardrobeController,
} from "../../../../controllers/StoryEditor/PlotField/Wardrobe/WardrobeController";

// Default route === /plotFieldCommands
export const wardrobeRoute = express.Router();

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId")
  .get(getCommandWardrobeByAppearancePartIdAndCommandWardrobeIdController)
  .patch(updateCommandWardrobeController)
  .delete(deleteCommandWardrobeController);

wardrobeRoute
  .route("/:plotFieldCommandId/wardrobes")
  .post(createCommandWardrobeController)
  .get(getCommandWardrobeByPlotFieldCommandIdController);

wardrobeRoute
  .route("/wardrobes/:commandWardrobeId/appearanceParts/:appearancePartId")
  .post(createCommandWardrobeAppearancePartController);
