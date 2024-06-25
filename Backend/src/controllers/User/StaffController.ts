import { RequestHandler } from "express";
import { createStaffMemberService } from "../../services/User/StaffServices";

export type CreateStaffMemberTypes = {
  role: string | undefined;
  username: string | undefined;
  password: string | undefined;
};

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
