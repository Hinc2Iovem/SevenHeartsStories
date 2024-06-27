import express from "express";
import {
  appearancePartControllerCreate,
  appearancePartControllerDelete,
  appearancePartControllerUpdateNameType,
} from "../../controllers/StoryData/AppearancePartController";

// Default route === /appearanceParts
export const appearancePartRoute = express.Router();

appearancePartRoute.route("/").post(appearancePartControllerCreate);

appearancePartRoute
  .route("/:appearancePartId/nameType")
  .patch(appearancePartControllerUpdateNameType);
appearancePartRoute
  .route("/:appearancePartId")
  .delete(appearancePartControllerDelete);
