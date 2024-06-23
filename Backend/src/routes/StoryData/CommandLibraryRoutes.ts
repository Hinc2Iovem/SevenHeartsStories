import express from "express";
import {
  commandLibraryControllerCreate,
  commandLibraryControllerDelete,
  commandLibraryControllerUpdate,
} from "../../controllers/StoryData/CommandLibraryController";

// Default route === /commandLibraries
export const commandLibraryRoute = express.Router();

commandLibraryRoute.route("/").get().post(commandLibraryControllerCreate);

commandLibraryRoute
  .route("/:commandLibraryId")
  .patch(commandLibraryControllerUpdate)
  .delete(commandLibraryControllerDelete);
