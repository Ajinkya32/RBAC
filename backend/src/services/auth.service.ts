import { PermissionType } from "../enums/role.enum";
import RoleModel from "../models/roles-permission.model";
import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";

export const getUserRole = async (userId: string) => {
  const user = await UserModel.findById(userId).populate("role");

  if (!user) {
    throw new NotFoundException("User not found");
  }

  const role = user.role;

  return { role: role };
};

export const verifyUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email }).populate(["currentTeam", "role"]);

  if (!user) {
    throw new NotFoundException("User not found for this email");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user.omitPassword();
};

export const getAllRollsService = async () => {
  const roles = await RoleModel.find({}).exec();

  return roles;
};

export const updateRolePermissionsService = async (id: string, permissions: PermissionType[]) => {
  const role = await RoleModel.findById(id);
  if (!role) throw new NotFoundException("Role not found");

  role.permissions = permissions;

  await role.save();

  return { message: "Permissions updated" };
};
