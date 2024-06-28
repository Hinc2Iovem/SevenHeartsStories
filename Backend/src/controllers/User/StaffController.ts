import { RequestHandler } from "express";
import {
  createStaffMemberService,
  deleteStaffMemberService,
  getAllStaffMembersService,
  getStaffMemberByIdService,
  updateStaffRolesService,
} from "../../services/User/StaffServices";

// @route GET http://localhost:3500/staff
// @access Private
export const getAllStaffMembersController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const staff = await getAllStaffMembersService();
    if (staff) {
      return res.status(201).json(staff);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

export type GetStaffMemberByIdParams = {
  staffId: string;
};
// @route GET http://localhost:3500/staff/:staffId
// @access Private
export const getStaffMemberByIdController: RequestHandler<
  GetStaffMemberByIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const staff = await getStaffMemberByIdService({
      staffId: req.params.staffId,
    });
    if (staff) {
      return res.status(201).json(staff);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

export type CreateStaffMemberTypes = {
  role: string | undefined;
  username: string | undefined;
  password: string | undefined;
};

// @route POST http://localhost:3500/staff
// @access Private
export const createStaffMemberController: RequestHandler<
  unknown,
  unknown,
  CreateStaffMemberTypes,
  unknown
> = async (req, res, next) => {
  try {
    const staff = await createStaffMemberService({
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
    });
    if (staff) {
      return res.status(201).json(staff);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
export type UpdateStaffRolesParams = {
  staffId: string;
};
export type UpdateStaffRolesBody = {
  role: string | undefined;
};

// @route PATCH http://localhost:3500/staff/:staffId/roles
// @access Private
export const updateStaffRolesController: RequestHandler<
  UpdateStaffRolesParams,
  unknown,
  UpdateStaffRolesBody,
  unknown
> = async (req, res, next) => {
  try {
    const staff = await updateStaffRolesService({
      role: req.body.role,
      staffId: req.params.staffId,
    });
    if (staff) {
      return res.status(201).json(staff);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
export type DeleteStaffRolesParams = {
  staffId: string;
};

// @route DELETE http://localhost:3500/staff/:staffId
// @access Private
export const deleteStaffMemberController: RequestHandler<
  DeleteStaffRolesParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const staff = await deleteStaffMemberService({
      staffId: req.params.staffId,
    });
    if (staff) {
      return res.status(201).json(staff);
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};
