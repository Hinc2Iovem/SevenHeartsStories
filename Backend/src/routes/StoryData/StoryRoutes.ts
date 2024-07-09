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

// Default route === /stories
export const storyRoute = express.Router();

storyRoute.route("/").get(storyGetAllController).post(storyCreateController);

storyRoute.route("/status").get(paginatedQuery(Story), (req, res) => {
  res.json(res.locals.paginatedResults);
});

storyRoute
  .route("/:storyId")
  .get(storyGetByIdController)
  .delete(storyDeleteController);

storyRoute.route("/:storyId/img").patch(storyUpdateImgUrlController);

storyRoute
  .route("/:storyId/assignWorkers")
  .get(getAllStoryAssignWorkersController);

storyRoute
  .route("/:storyId/staff/:staffId/assignWorkers")
  .patch(storyAssignWorkersController)
  .get(getStoryAssignWorkerController);

storyRoute
  .route("/staff/:staffId/assignWorkers")
  .get(getAllAssignedStoriesByStaffIdController);

storyRoute.route("/:storyId/status").patch(storyUpdateStatusController);
