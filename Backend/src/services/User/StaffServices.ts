import createHttpError from "http-errors";
import { CreateStaffMemberTypes } from "../../controllers/User/StaffController";
import { StaffRoles } from "../../consts/STAFF_ROLES";
import { validateMongoId } from "../../utils/validateMongoId";
import Staff from "../../models/User/Staff";
import brcypt from "bcrypt";
import env from "../../utils/validateEnv";
import StaffInfo from "../../models/User/StaffInfo";

export const getAllStaffMembersService = async () => {
  const existingStaffMembers = await Staff.find().lean();
  if (!existingStaffMembers.length) {
    return [];
  }

  return existingStaffMembers;
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

type GetStaffInfoMemberByIdTypes = {
  staffId: string;
};

export const getStaffInfoMemberByIdService = async ({
  staffId,
}: GetStaffInfoMemberByIdTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });

  const existingStaffInfo = await StaffInfo.findOne({ staffId }).lean();
  if (!existingStaffInfo) {
    return null;
  }

  return existingStaffInfo;
};

export const createStaffMemberService = async ({
  password,
  role,
  username,
  key,
}: CreateStaffMemberTypes) => {
  if (
    !password?.trim().length ||
    !username?.trim().length ||
    !key?.trim().length
  ) {
    throw createHttpError(400, "Password, username and key are required");
  }

  if (env.REG_KEY !== key.trim()) {
    throw createHttpError(403, "Key is wrong");
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
    const newStaffMember = await Staff.create({
      password: encryptedPassword,
      roles: [role?.toLowerCase()],
      username,
    });
    newStaffMember.password = "";
    if (role === "scriptwriter" || role === "headscriptwriter") {
      await StaffInfo.create({
        amountOfFinishedEpisodes: 0,
        staffId: newStaffMember._id,
      });
    }
    return newStaffMember;
  } else {
    const newStaffMember = await Staff.create({
      password: encryptedPassword,
      username,
    });

    newStaffMember.password = "";
    await StaffInfo.create({
      amountOfFinishedEpisodes: 0,
      staffId: newStaffMember._id,
    });
    return newStaffMember;
  }
};

type UpdateStaffImgUrlTypes = {
  imgUrl: string | undefined;
  staffId: string;
};

export const updateStaffImgService = async ({
  imgUrl,
  staffId,
}: UpdateStaffImgUrlTypes) => {
  validateMongoId({ value: staffId, valueName: "Staff" });

  if (!imgUrl?.trim().length) {
    throw createHttpError(400, "ImgUrl is required");
  }

  const existingStaffMember = await Staff.findById(staffId).exec();
  if (!existingStaffMember) {
    throw createHttpError(400, "User with such id wasn't found");
  }

  existingStaffMember.imgUrl = imgUrl;

  return await existingStaffMember.save();
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
