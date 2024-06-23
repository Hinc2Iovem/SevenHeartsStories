import express from "express";
import {
  appearancePartControllerCreate,
  appearancePartControllerDelete,
  appearancePartControllerUpdateNameType,
} from "../../controllers/StoryData/AppearancePartController";

// Default route === /audio
export const audioRoute = express.Router();

audioRoute.route("/").get().post(appearancePartControllerCreate);

audioRoute
  .route("/:appearancePartId/nameType")
  .patch(appearancePartControllerUpdateNameType);
audioRoute.route("/:appearancePartId").delete(appearancePartControllerDelete);
