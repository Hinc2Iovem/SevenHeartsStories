import express from "express";
import {
  appearancePartControllerCreate,
  appearancePartControllerDelete,
  appearancePartControllerUpdateImg,
  appearancePartGetAllController,
  appearancePartGetByCharacterIdController,
} from "../../controllers/StoryData/AppearancePartController";

// Default route === /appearanceParts
export const appearancePartRoute = express.Router();

appearancePartRoute.route("/").get(appearancePartGetAllController);

appearancePartRoute
  .route("/characters/:characterId")
  .get(appearancePartGetByCharacterIdController)
  .post(appearancePartControllerCreate);

appearancePartRoute
  .route("/:appearancePartId/img")
  .patch(appearancePartControllerUpdateImg);

appearancePartRoute
  .route("/:appearancePartId")
  .delete(appearancePartControllerDelete);
