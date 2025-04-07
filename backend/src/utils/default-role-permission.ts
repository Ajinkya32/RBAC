import { Permissions, PermissionType, RoleType } from "../enums/role.enum";

export const DefaultRolePermissions: Record<RoleType, Array<PermissionType>> = {
  ADMIN: [
    // PRODUCTS
    Permissions.CREATE_PRODUCT,
    Permissions.VIEW_PRODUCT,
    Permissions.EDIT_PRODUCT,
    Permissions.DELETE_PRODUCT,

    // USERS
    Permissions.CREATE_USER,
    Permissions.VIEW_USER,
    Permissions.EDIT_USER,
    Permissions.DELETE_USER,
    Permissions.CHANGE_USER_ROLE,

    // ORDERS
    Permissions.CREATE_ORDER,
    Permissions.VIEW_ORDER,
    Permissions.EDIT_ORDER,
    Permissions.DELETE_ORDER,

    // MEMBERS
    Permissions.CREATE_MEMBER,
    Permissions.VIEW_MEMBER,
    Permissions.EDIT_MEMBER,
    Permissions.DELETE_MEMBER,
    Permissions.CHANGE_MEMBER_ROLE,

    // TEAMS
    Permissions.CREATE_TEAM,
    Permissions.VIEW_TEAM,
    Permissions.EDIT_TEAM,
    Permissions.DELETE_TEAM,

    Permissions.VIEW_ONLY,
  ],
  MANAGER: [
    // PRODUCTS
    Permissions.CREATE_PRODUCT,
    Permissions.VIEW_PRODUCT,
    Permissions.EDIT_PRODUCT,
    Permissions.DELETE_PRODUCT,

    // ORDERS
    Permissions.CREATE_ORDER,
    Permissions.VIEW_ORDER,
    Permissions.EDIT_ORDER,
    Permissions.DELETE_ORDER,

    // MEMBERS
    Permissions.VIEW_MEMBER,
  ],
  EMPLOYEE: [
    // PRODUCTS
    Permissions.VIEW_PRODUCT,

    // ORDERS
    Permissions.CREATE_ORDER,
    Permissions.VIEW_ORDER,
  ],
};
