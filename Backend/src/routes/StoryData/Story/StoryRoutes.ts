import express from "express";
import {
  getAllAssignedStoriesByStaffIdController,
  getAllAssignedStoriesTranslationByStaffIdController,
  getAllStoriesByLanguageController,
  getAllStoryAssignWorkersController,
  getStoryAssignWorkerController,
  storyAssignWorkersController,
  storyCreateController,
  storyDeleteController,
  storyGetAllController,
  storyGetByIdController,
  storyUpdateImgUrlController,
  storyUpdateStatusForWorkerController,
} from "../../../controllers/StoryData/Story/StoryController";
import paginatedStoryQuery from "../../../middlewares/paginatedStoryQuery";
import Story from "../../../models/StoryData/Story";
import { verifyHeadScriptwriter } from "../../../middlewares/verifyHeadScriptwriter";
import { verifyJWT } from "../../../middlewares/verifyJWT";

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").post(verifyHeadScriptwriter, storyCreateController);
// storyRoute.route("/language").get(verifyJWT, getAllStoriesByLanguageController);

storyRoute.route("/").get(storyGetAllController);

storyRoute
  .route("/status")
  .get(verifyJWT, paginatedStoryQuery(Story), (req, res) => {
    res.json(res.locals.paginatedResults);
  });

storyRoute
  .route("/:storyId")
  .get(verifyJWT, storyGetByIdController)
  .delete(verifyHeadScriptwriter, storyDeleteController);

storyRoute
  .route("/:storyId/img")
  .patch(verifyHeadScriptwriter, storyUpdateImgUrlController);

storyRoute
  .route("/:storyId/assignWorkers")
  .get(verifyJWT, getAllStoryAssignWorkersController);

storyRoute
  .route("/translations/staff/:staffId/assignWorkers")
  .get(verifyJWT, getAllAssignedStoriesTranslationByStaffIdController);

storyRoute
  .route("/:storyId/staff/:staffId/assignWorkers")
  .patch(verifyHeadScriptwriter, storyAssignWorkersController)
  .get(verifyJWT, getStoryAssignWorkerController);

storyRoute
  .route("/staff/:staffId/assignWorkers")
  .get(verifyJWT, getAllAssignedStoriesByStaffIdController);

storyRoute
  .route("/:storyId/staff/:staffId/status")
  .patch(verifyJWT, storyUpdateStatusForWorkerController);
