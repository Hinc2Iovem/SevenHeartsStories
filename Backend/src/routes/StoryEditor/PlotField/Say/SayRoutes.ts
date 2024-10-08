import express from "express";
import {
  createSayBlankController,
  createSayController,
  deleteSayController,
  getSayByPlotFieldCommandIdController,
  updateSayCharacterOrEmotionIdController,
  updateSayCommandSideController,
  updateSayController,
  updateSayTypeController,
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
  .route("/:plotFieldCommandId/say/characters/:characterId")
  .post(createSayBlankController);

sayRoute
  .route(
    "/say/:sayId/characters/:characterId/characterEmotions/:characterEmotionId"
  )
  .patch(updateSayController);

sayRoute
  .route("/say/:sayId/characterOrEmotionId")
  .patch(updateSayCharacterOrEmotionIdController);

sayRoute.route("/say/:sayId/type").patch(updateSayTypeController);
sayRoute.route("/say/:sayId").delete(deleteSayController);

sayRoute.route("/say/:sayId/commandSide").patch(updateSayCommandSideController);
