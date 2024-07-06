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
  plotFieldCommandRoute,
  getItemsRoute,
  movesRoute,
  musicRoute,
  sayRoute,
  seasonRoute,
  storyRoute,
  suitRoute,
  topologyBlockRoute,
  waitRoute,
  wardrobeRoute,
  characterCharacteristicRoute,
  commandMusicRoute,
  commandNameRoute,
  keyRoute,
  staffRoute,
  choiceOptionVariationsRoute,
  ifRoute,
  ifValuesRoute,
  translationRoute,
  soundCommandRoute,
  soundRoute,
} from "./routes/index";

dotenv.config();

const app = express();
const port = env.PORT;

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/translations", translationRoute);

app.use("/appearanceParts", appearancePartRoute);
app.use("/characterCharacteristics", characterCharacteristicRoute);
app.use("/characters", characterRoute);
app.use("/characterEmotions", characterEmotionRoute);
app.use("/commandLibraries", commandLibraryRoute);
app.use("/episodes", episodeRoute);
app.use("/episodeInfo", episodeInfoRoute);
app.use("/stories", seasonRoute);
app.use("/stories", storyRoute);
app.use("/stories", musicRoute);
app.use("/stories", achievementRoute);
app.use("/stories", soundRoute);

app.use("/plotFieldCommands", ambientRoute);
app.use("/plotFieldCommands", backgroundRoute);
app.use("/plotFieldCommands", callRoute);
app.use("/plotFieldCommands", choiceOptionRoute);
app.use("/plotFieldCommands", choiceRoute);
app.use("/plotFieldCommands", choiceOptionVariationsRoute);
app.use("/plotFieldCommands", ifRoute);
app.use("/plotFieldCommands", ifValuesRoute);
app.use("/plotFieldCommands", conditionRoute);
app.use("/plotFieldCommands", conditionValuesRoute);
app.use("/plotFieldCommands", cutScenesRoute);
app.use("/plotFieldCommands", effectsRoute);
app.use("/plotFieldCommands", getItemsRoute);
app.use("/plotFieldCommands", keyRoute);
app.use("/plotFieldCommands", movesRoute);
app.use("/plotFieldCommands", commandMusicRoute);
app.use("/plotFieldCommands", commandNameRoute);
app.use("/plotFieldCommands", sayRoute);
app.use("/plotFieldCommands", soundCommandRoute);
app.use("/plotFieldCommands", suitRoute);
app.use("/plotFieldCommands", waitRoute);
app.use("/plotFieldCommands", wardrobeRoute);

app.use("/topologyBlocks", topologyBlockRoute);
app.use("/plotField", plotFieldCommandRoute);

app.use("/staff", staffRoute);

mongoose.connection.once("open", () => {
  console.log("Connected");
  app.listen(port, () => console.log(`Working on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
