import createHttpError from "http-errors";
import { CreateStaffMemberTypes } from "../../controllers/User/StaffController";
import { StaffRoles } from "../../consts/STAFF_ROLES";
import Staff from "../../models/User/Staff";
import brcypt from "bcrypt";

export const createStaffMemberService = async ({
  password,
  role,
  username,
}: CreateStaffMemberTypes) => {
  if (
    !password?.trim.length ||
    !username?.trim().length ||
    !role?.trim().length
  ) {
    throw createHttpError(400, "Password, username and role is required");
  }

  if (!StaffRoles.includes(role.toLocaleLowerCase())) {
    throw createHttpError(400, "Unexpected role");
  }

  const existingStaffMember = await Staff.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (existingStaffMember) {
    throw createHttpError(409, "User with such username already exists");
  }

  const encryptedPassword = await brcypt.hash(password, 10);

  return await Staff.create({
    password: encryptedPassword,
    roles: [role],
    username,
  });
};
