import express from "express";
import {
  createSayController,
  deleteSayController,
  getSayByPlotFieldCommandIdController,
  updateSayCommandSideController,
  updateSayController,
} from "../../../../controllers/StoryEditor/PlotField/Say/SayController";

// Default route === /plotFieldCommands
export const sayRoute = express.Router();

sayRoute
  .route("/:plotFieldCommandId/say")
  .get(getSayByPlotFieldCommandIdController);

sayRoute
  .route(
    "/:plotFieldCommandId/say/characters/:characterId/characterEmotions/:characterEmotionId"
  )
  .post(createSayController);

sayRoute
  .route(
    "/say/:sayId/characters/:characterId/characterEmotions/:characterEmotionId"
  )
  .patch(updateSayController);
sayRoute.route("/say/:sayId").delete(deleteSayController);

sayRoute.route("/say/:sayId/commandSide").patch(updateSayCommandSideController);
