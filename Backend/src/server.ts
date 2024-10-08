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
  conditionBlockRoute,
  authRoute,
  getItemTranslationsRoute,
  storyTranslationRoute,
  episodeTranslationRoute,
  seasonTranslationRoute,
  sayTranslationsRoute,
  achievementTranslationsRoute,
  commandWardrobeTranslationsRoute,
  appearancePartTranslationsRoute,
  choiceTranslationsRoute,
  choiceOptionTranslationsRoute,
  characteristicTranslationRoute,
  characterTranslationRoute,
  commentRoute,
} from "./routes/index";
import { verifyJWT } from "./middlewares/verifyJWT";

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

app.use("/auth", authRoute);
app.use("/stories", storyTranslationRoute);
app.use("/stories", storyRoute);

app.use("/translations", verifyJWT, translationRoute);

app.use("/appearanceParts", verifyJWT, appearancePartRoute);
app.use("/appearanceParts", verifyJWT, appearancePartTranslationsRoute);
app.use("/characterCharacteristics", verifyJWT, characterCharacteristicRoute);
app.use("/characteristics", verifyJWT, characteristicTranslationRoute);
app.use("/characters", verifyJWT, characterRoute);
app.use("/characters", verifyJWT, characterTranslationRoute);
app.use("/characterEmotions", verifyJWT, characterEmotionRoute);
app.use("/commandLibraries", verifyJWT, commandLibraryRoute);
app.use("/episodes", verifyJWT, episodeRoute);
app.use("/episodes", verifyJWT, episodeTranslationRoute);
app.use("/episodeInfo", verifyJWT, episodeInfoRoute);
app.use("/stories", verifyJWT, seasonRoute);
app.use("/seasons", verifyJWT, seasonTranslationRoute);
app.use("/stories", verifyJWT, musicRoute);
app.use("/stories", verifyJWT, achievementRoute);
app.use("/achievements", verifyJWT, achievementTranslationsRoute);
app.use("/stories", verifyJWT, soundRoute);

app.use("/plotFieldCommands", verifyJWT, ambientRoute);
app.use("/plotFieldCommands", verifyJWT, backgroundRoute);
app.use("/plotFieldCommands", verifyJWT, callRoute);
app.use("/plotFieldCommands", verifyJWT, commentRoute);
app.use("/plotFieldCommands", verifyJWT, choiceOptionRoute);
app.use("/choiceOptions", verifyJWT, choiceOptionTranslationsRoute);
app.use("/plotFieldCommands", verifyJWT, choiceRoute);
app.use("/choices", verifyJWT, choiceTranslationsRoute);
app.use("/plotFieldCommands", verifyJWT, choiceOptionVariationsRoute);
app.use("/plotFieldCommands", verifyJWT, ifRoute);
app.use("/plotFieldCommands", verifyJWT, ifValuesRoute);
app.use("/plotFieldCommands", verifyJWT, conditionRoute);
app.use("/commandConditions", verifyJWT, conditionBlockRoute);
app.use("/plotFieldCommands", verifyJWT, conditionValuesRoute);
app.use("/plotFieldCommands", verifyJWT, cutScenesRoute);
app.use("/plotFieldCommands", verifyJWT, effectsRoute);
app.use("/plotFieldCommands", verifyJWT, getItemsRoute);
app.use("/getItems", verifyJWT, getItemTranslationsRoute);
app.use("/plotFieldCommands", verifyJWT, keyRoute);
app.use("/plotFieldCommands", verifyJWT, movesRoute);
app.use("/plotFieldCommands", verifyJWT, commandMusicRoute);
app.use("/plotFieldCommands", verifyJWT, commandNameRoute);
app.use("/plotFieldCommands", verifyJWT, sayRoute);
app.use("/says", verifyJWT, sayTranslationsRoute);
app.use("/plotFieldCommands", verifyJWT, soundCommandRoute);
app.use("/plotFieldCommands", verifyJWT, suitRoute);
app.use("/plotFieldCommands", verifyJWT, waitRoute);
app.use("/plotFieldCommands", verifyJWT, wardrobeRoute);
app.use("/commandWardrobes", verifyJWT, commandWardrobeTranslationsRoute);

app.use("/topologyBlocks", verifyJWT, topologyBlockRoute);
app.use("/plotField", verifyJWT, plotFieldCommandRoute);

app.use("/staff", staffRoute);

mongoose.connection.once("open", () => {
  console.log("Connected");
  app.listen(port, () => console.log(`Working on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
