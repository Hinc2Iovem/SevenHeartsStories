import express from "express";
import {
  login,
  logout,
  refresh,
  signUp,
} from "../../controllers/Auth/AuthController";

// Default route === /auth
export const authRoute = express.Router();

authRoute.route("/").post(login);
authRoute.route("/refresh").get(refresh);
authRoute.route("/register").post(signUp);
authRoute.route("/logout").post(logout);
