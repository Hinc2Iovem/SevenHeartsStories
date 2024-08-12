import express from "express";
import {
  deleteStaffMemberController,
  getAllScriptWritersController,
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

staffRoute.route("/").get(verifyJWT, getAllStaffMembersController);

staffRoute
  .route("/scriptwriters")
  .get(verifyJWT, getAllScriptWritersController);

staffRoute.route("/:staffId").get(verifyJWT, getStaffMemberByIdController);
staffRoute
  .route("/:staffId/staffInfo")
  .get(verifyJWT, getStaffInfoMemberByIdController);
staffRoute.route("/:staffId").delete(verifyEditor, deleteStaffMemberController);
staffRoute
  .route("/:staffId/roles")
  .patch(verifyEditor, updateStaffRolesController);
staffRoute.route("/:staffId/img").patch(verifyJWT, updateStaffImgController);
