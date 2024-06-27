import express from "express";
import {
  createSayController,
  deleteSayController,
  updateSayCommandSideController,
  updateSayTextController,
} from "../../../../controllers/StoryEditor/PlotField/Say/SayController";

// Default route === /plotFieldCommands
export const sayRoute = express.Router();

sayRoute.route("/:plotFieldCommandId/say").post(createSayController);
sayRoute
  .route("/say/:sayId")
  .patch(updateSayTextController)
  .delete(deleteSayController);
sayRoute.route("/say/:sayId/commandSide").patch(updateSayCommandSideController);
