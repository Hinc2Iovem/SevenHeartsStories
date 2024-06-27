import express from "express";
import { createStaffMemberController } from "../../controllers/User/StaffController";

// Default route === /staff
export const staffRoute = express.Router();

staffRoute.route("/").post(createStaffMemberController);
