import "dotenv/config";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import { connectDB } from "./config/dbConn";

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

mongoose.connection.once("open", () => {
  console.log("Connected");
  app.listen(port, () => console.log(`Working on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
