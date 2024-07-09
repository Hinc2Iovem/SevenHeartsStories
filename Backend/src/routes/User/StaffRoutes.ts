import express from "express";
import {
  createStaffMemberController,
  deleteStaffMemberController,
  getAllStaffMembersController,
  getStaffInfoMemberByIdController,
  getStaffMemberByIdController,
  updateStaffImgController,
  updateStaffRolesController,
} from "../../controllers/User/StaffController";

// Default route === /staff
export const staffRoute = express.Router();

staffRoute
  .route("/")
  .get(getAllStaffMembersController)
  .post(createStaffMemberController);

staffRoute.route("/:staffId").get(getStaffMemberByIdController);
staffRoute.route("/:staffId/staffInfo").get(getStaffInfoMemberByIdController);
staffRoute.route("/:staffId").delete(deleteStaffMemberController);
staffRoute.route("/:staffId/roles").patch(updateStaffRolesController);
staffRoute.route("/:staffId/img").patch(updateStaffImgController);
