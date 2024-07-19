import express from "express";
import {
  createMusicController,
  deleteMusicController,
  getMusicByPlotFieldCommandIdController,
  updateMusicController,
} from "../../../../controllers/StoryEditor/PlotField/Music/CommandMusicController";

// Default route === /plotFieldCommands
export const commandMusicRoute = express.Router();

commandMusicRoute
  .route("/:plotFieldCommandId/music")
  .get(getMusicByPlotFieldCommandIdController)
  .post(createMusicController);

commandMusicRoute
  .route("/stories/:storyId/commandMusic/:commandMusicId")
  .patch(updateMusicController);

commandMusicRoute.route("/music/:musicId").delete(deleteMusicController);
