import express from "express";
import {
  getAllStoryAssignWorkersController,
  getStoryAssignWorkerController,
  storyAssignWorkersController,
  storyCreateController,
  storyDeleteController,
  storyGetAllController,
  storyGetByIdController,
  storyUpdateImgUrlController,
  storyUpdateStatusController,
  getAllAssignedStoriesByStaffIdController,
} from "../../controllers/StoryData/StoryController";
import paginatedQuery from "../../middlewares/paginatedQuery";
import Story from "../../models/StoryData/Story";
import { verifyJWT } from "../../middlewares/verifyJWT";
import { verifyEditor } from "../../middlewares/verifyEditor";
import { verifyHeadScriptwriter } from "../../middlewares/verifyHeadScriptwriter";

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").get(storyGetAllController).post(storyCreateController);

storyRoute.route("/status").get(paginatedQuery(Story), (req, res) => {
  res.json(res.locals.paginatedResults);
});

storyRoute
  .route("/:storyId")
  .get(verifyJWT, storyGetByIdController)
  .delete(verifyEditor, storyDeleteController);

storyRoute
  .route("/:storyId/img")
  .patch(verifyHeadScriptwriter, storyUpdateImgUrlController);

storyRoute
  .route("/:storyId/assignWorkers")
  .get(verifyJWT, getAllStoryAssignWorkersController);

storyRoute
  .route("/:storyId/staff/:staffId/assignWorkers")
  .patch(verifyHeadScriptwriter, storyAssignWorkersController)
  .get(verifyJWT, getStoryAssignWorkerController);

storyRoute
  .route("/staff/:staffId/assignWorkers")
  .get(verifyJWT, getAllAssignedStoriesByStaffIdController);

storyRoute
  .route("/:storyId/status")
  .patch(verifyJWT, storyUpdateStatusController);
