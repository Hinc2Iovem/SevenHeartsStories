import express from "express";
import {
  commandLibraryControllerCreate,
  commandLibraryControllerDelete,
  commandLibraryControllerUpdate,
  getAllCommandLibrariesController,
} from "../../controllers/StoryData/CommandLibraryController";

// Default route === /commandLibraries
export const commandLibraryRoute = express.Router();

commandLibraryRoute
  .route("/")
  .get(getAllCommandLibrariesController)
  .post(commandLibraryControllerCreate);

commandLibraryRoute
  .route("/:commandLibraryId")
  .patch(commandLibraryControllerUpdate)
  .delete(commandLibraryControllerDelete);
