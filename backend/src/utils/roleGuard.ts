import { PermissionType } from "../enums/role.enum";
import { RoleDocument } from "../models/roles-permission.model";
import { UnauthorizedException } from "./appError";

export const roleGuard = async (role: RoleDocument, requiredPermissions: PermissionType[]) => {
  const permissions = role.permissions;

  const hasPermission = requiredPermissions.every((permission) => permissions.includes(permission));

  if (!hasPermission) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action"
    );
  }
};
