import express from "express";
import {
  createStaffMemberController,
  deleteStaffMemberController,
  getAllStaffMembersController,
  getStaffMemberByIdController,
  updateStaffRolesController,
} from "../../controllers/User/StaffController";

// Default route === /staff
export const staffRoute = express.Router();

staffRoute
  .route("/")
  .get(getAllStaffMembersController)
  .post(createStaffMemberController);

staffRoute.route("/:staffId").get(getStaffMemberByIdController);
staffRoute.route("/:staffId").delete(deleteStaffMemberController);
staffRoute.route("/:staffId/roles").patch(updateStaffRolesController);
