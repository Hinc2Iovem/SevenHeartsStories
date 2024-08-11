import express from "express";
import {
  deleteStaffMemberController,
  getAllStaffMembersController,
  getStaffInfoMemberByIdController,
  getStaffMemberByIdController,
  updateStaffImgController,
  updateStaffRolesController,
} from "../../controllers/User/StaffController";
import { verifyEditor } from "../../middlewares/verifyEditor";
import { verifyJWT } from "../../middlewares/verifyJWT";

// Default route === /staff
export const staffRoute = express.Router();

staffRoute.route("/").get(getAllStaffMembersController);

staffRoute.route("/:staffId").get(verifyJWT, getStaffMemberByIdController);
staffRoute
  .route("/:staffId/staffInfo")
  .get(verifyJWT, getStaffInfoMemberByIdController);
staffRoute.route("/:staffId").delete(verifyEditor, deleteStaffMemberController);
staffRoute
  .route("/:staffId/roles")
  .patch(verifyEditor, updateStaffRolesController);
staffRoute.route("/:staffId/img").patch(verifyJWT, updateStaffImgController);
