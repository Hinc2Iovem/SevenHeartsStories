import express from "express";
import {
  createMusicController,
  deleteMusicController,
  updateMusicController,
} from "../../../../controllers/StoryEditor/PlotField/Music/CommandMusicController";

// Default route === /plotFieldCommands
export const musicRoute = express.Router();

musicRoute.route("/:plotFieldCommandId/music").post(createMusicController);
musicRoute
  .route("/music/:musicId")
  .patch(updateMusicController)
  .delete(deleteMusicController);
