import express from "express";
import {
  createSayController,
  deleteSayController,
  updateSayTextController,
} from "../../../../controllers/StoryEditor/Flowchart/Say/SayController";

// Default route === /flowchartCommands
export const sayRoute = express.Router();

sayRoute.route("/:flowchartCommandId/say").post(createSayController);
sayRoute
  .route("/say/:sayId")
  .patch(updateSayTextController)
  .delete(deleteSayController);
