import express from "express";
import {
  createMusicController,
  deleteMusicController,
  updateMusicController,
} from "../../../../controllers/StoryEditor/Flowchart/Music/MusicController";

// Default route === /flowchartCommands
export const musicRoute = express.Router();

musicRoute.route("/:flowchartCommandId/music").post(createMusicController);
musicRoute
  .route("/music/:musicId")
  .patch(updateMusicController)
  .delete(deleteMusicController);
