import express from "express";
import {
  appearancePartControllerCreate,
  appearancePartControllerDelete,
  appearancePartControllerUpdateImg,
  appearancePartGetAllController,
  appearancePartGetByAppearancePartIdController,
  appearancePartGetByCharacterIdAndTypeController,
  appearancePartGetByCharacterIdController,
} from "../../../controllers/StoryData/AppearancePart/AppearancePartController";

// Default route === /appearanceParts
export const appearancePartRoute = express.Router();

appearancePartRoute.route("/").get(appearancePartGetAllController);

appearancePartRoute
  .route("/:appearancePartId")
  .get(appearancePartGetByAppearancePartIdController);

appearancePartRoute
  .route("/characters/:characterId")
  .get(appearancePartGetByCharacterIdController)
  .post(appearancePartControllerCreate);

appearancePartRoute
  .route("/characters/:characterId/type")
  .get(appearancePartGetByCharacterIdAndTypeController);

appearancePartRoute
  .route("/:appearancePartId/img")
  .patch(appearancePartControllerUpdateImg);

appearancePartRoute
  .route("/:appearancePartId")
  .delete(appearancePartControllerDelete);
