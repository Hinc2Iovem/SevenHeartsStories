import "dotenv/config";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import { connectDB } from "./config/dbConn";
import {
  achievementRoute,
  ambientRoute,
  appearancePartRoute,
  backgroundRoute,
  callRoute,
  characterEmotionRoute,
  characterRoute,
  choiceOptionRoute,
  choiceRoute,
  commandLibraryRoute,
  conditionRoute,
  conditionValuesRoute,
  cutScenesRoute,
  effectsRoute,
  episodeInfoRoute,
  episodeRoute,
  flowchartCommandRoute,
  flowchartRoute,
  getItemsRoute,
  movesRoute,
  musicRoute,
  sayRoute,
  seasonRoute,
  soundRoute,
  storyRoute,
  suitRoute,
  topologyBlockRoute,
  waitRoute,
  wardrobeRoute,
} from "./routes/index";

dotenv.config();

const app = express();
const port = env.PORT;

connectDB();

// const corsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true,
//   };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/appearanceParts", appearancePartRoute);
app.use("/characters", characterRoute);
app.use("/characterEmotions", characterEmotionRoute);
app.use("/commandLibraries", commandLibraryRoute);
app.use("/episodes", episodeRoute);
app.use("/episodeInfo", episodeInfoRoute);
app.use("/seasons", seasonRoute);
app.use("/stories", storyRoute);
app.use("/topologyBlocks", topologyBlockRoute);
app.use("/flowcharts", flowchartRoute);
app.use("/flowchartCommands", flowchartCommandRoute);
app.use("/flowchartCommands", achievementRoute);
app.use("/flowchartCommands", ambientRoute);
app.use("/flowchartCommands", backgroundRoute);
app.use("/flowchartCommands", callRoute);
app.use("/flowchartCommands", choiceOptionRoute);
app.use("/flowchartCommands", choiceRoute);
app.use("/flowchartCommands", conditionRoute);
app.use("/flowchartCommands", conditionValuesRoute);
app.use("/flowchartCommands", cutScenesRoute);
app.use("/flowchartCommands", effectsRoute);
app.use("/flowchartCommands", getItemsRoute);
app.use("/flowchartCommands", movesRoute);
app.use("/flowchartCommands", musicRoute);
app.use("/flowchartCommands", sayRoute);
app.use("/flowchartCommands", soundRoute);
app.use("/flowchartCommands", suitRoute);
app.use("/flowchartCommands", waitRoute);
app.use("/flowchartCommands", wardrobeRoute);

mongoose.connection.once("open", () => {
  console.log("Connected");
  app.listen(port, () => console.log(`Working on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
