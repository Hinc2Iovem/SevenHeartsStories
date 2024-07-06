import createHttpError from "http-errors";
import { CreateStaffMemberTypes } from "../../controllers/User/StaffController";
import { StaffRoles } from "../../consts/STAFF_ROLES";
import Staff from "../../models/User/Staff";
import brcypt from "bcrypt";
import { validateMongoId } from "../../utils/validateMongoId";

export const getAllStaffMembersService = async () => {
  const existingStaffMember = await Staff.find().lean();
  if (!existingStaffMember.length) {
    return [];
  }

  return existingStaffMember;
};

type GetStaffMemberByIdTypes = {
  staffId: string;
};

export const getStaffMemberByIdService = async ({
  staffId,
}: GetStaffMemberByIdTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });

  const existingStaffMember = await Staff.findById(staffId).lean();
  if (!existingStaffMember) {
    return null;
  }

  return existingStaffMember;
};

export const createStaffMemberService = async ({
  password,
  role,
  username,
}: CreateStaffMemberTypes) => {
  if (!password?.trim().length || !username?.trim().length) {
    throw createHttpError(400, "Password and username  is required");
  }

  if (role?.trim().length && !StaffRoles.includes(role.toLowerCase())) {
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
  if (role?.trim().length) {
    await Staff.create({
      password: encryptedPassword,
      roles: [role?.toLowerCase()],
      username,
    });
  } else {
    await Staff.create({
      password: encryptedPassword,
      username,
    });
  }
  return {
    username,
    roles: [role?.toLowerCase() ?? "scriptwriter"],
  };
};

type UpdateStaffRolesTypes = {
  role: string | undefined;
  staffId: string;
};

export const updateStaffRolesService = async ({
  role,
  staffId,
}: UpdateStaffRolesTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });

  if (!role?.trim().length) {
    throw createHttpError(400, "Role is required");
  }

  if (!StaffRoles.includes(role.toLowerCase())) {
    throw createHttpError(400, "Unexpected role");
  }

  const existingStaffMember = await Staff.findById(staffId).exec();
  if (!existingStaffMember) {
    throw createHttpError(400, "User with such id wasn't found");
  }

  existingStaffMember.roles.push(role.toLowerCase());

  return await existingStaffMember.save();
};

type DeleteStaffMemberTypes = {
  staffId: string;
};

export const deleteStaffMemberService = async ({
  staffId,
}: DeleteStaffMemberTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });

  const existingStaffMember = await Staff.findById(staffId).exec();
  if (!existingStaffMember) {
    throw createHttpError(400, "User with such id wasn't found");
  }

  return await existingStaffMember.deleteOne();
};
